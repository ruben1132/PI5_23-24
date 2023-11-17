import { Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import * as bcrypt from 'bcrypt';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from '../mappers/UserMap';
import { IUserDTO, IUserWithRoleDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';

import { User } from '../domain/user';
import { UserPassword } from '../domain/valueObj/userPassword';
import { UserEmail } from '../domain/valueObj/userEmail';

import { Role } from '../domain/role';

import { Result } from '../core/logic/Result';

@Service()
export default class UserService implements IUserService {
    constructor(
        @Inject(config.repos.user.name) private userRepo: IUserRepo,
        @Inject(config.repos.role.name) private roleRepo: IRoleRepo,
        @Inject('logger') private logger,
    ) {}

    public async login(email: string, password: string): Promise<Result<{ userDTO: IUserWithRoleDTO; token: string }>> {
        try {
            const user = await this.userRepo.findByEmail(email);

            if (!user) {
                return Result.fail<{ userDTO: IUserWithRoleDTO; token: string }>('User not found');
            }

            const passwordMatch = await bcrypt.compare(password, user.password.value);

            if (!passwordMatch) {
                return Result.fail<{ userDTO: IUserWithRoleDTO; token: string }>('Invalid password');
            }

            // get role
            const role = await this.getRole(user.role.toString());

            if (role.isFailure) {
                return Result.fail<{ userDTO: IUserWithRoleDTO; token: string }>('Role doesnt exist!');
            }

            const userDTO = UserMap.toDTO(user, role.getValue());

            const token = this.generateToken(userDTO);


            return Result.ok<{ userDTO: IUserWithRoleDTO; token: string }>({ userDTO, token });
        } catch (e) {
            this.logger.error(e);
            return Result.fail<{ userDTO: IUserWithRoleDTO; token: string }>('Internal Server Error');
        }
    }

    public async createUser(newUser: IUserDTO): Promise<Result<IUserWithRoleDTO>> {
        try {
            // check if role exists
            const role = await this.getRole(newUser.role);

            if (role.isFailure) {
                return Result.fail<IUserWithRoleDTO>('Role doesnt exist!');
            }

            const hashedPassword = await bcrypt.hash(newUser.password, 10); // 10 is the number of salt rounds

            const userOrError = User.create({
                email: UserEmail.create(newUser.email).getValue(),
                password: UserPassword.create({ value: hashedPassword }).getValue(),
                username: newUser.username,
                role: role.getValue().id,
            });

            if (userOrError.isFailure) {
                return Result.fail<IUserWithRoleDTO>(userOrError.errorValue());
            }

            const user = userOrError.getValue();

            await this.userRepo.save(user);

            const userDTO = UserMap.toDTO(user, role.getValue());

            return Result.ok<IUserWithRoleDTO>(userDTO);
        } catch (e) {
            this.logger.error(e);
            return Result.fail<IUserWithRoleDTO>('Internal Server Error');
        }
    }

    public async getUsers(): Promise<Result<IUserWithRoleDTO[]>> {
        try {
            const users = await this.userRepo.findAll();

            if (!users) {
                return Result.fail<Array<IUserWithRoleDTO>>('Users not found');
            }

            let usersWithRole = [];
            for (const user of users) {
                // get role
                const role = await this.getRole(user.role.toString());
                if (role.isFailure) {
                    return Result.fail<IUserWithRoleDTO[]>('Role doesnt exist!');
                }
                const userDTO = UserMap.toDTO(user, role.getValue());
                usersWithRole.push(userDTO);
            }

            return Result.ok<IUserWithRoleDTO[]>(usersWithRole);
        } catch (e) {
            this.logger.error(e);
            return Result.fail<Array<IUserWithRoleDTO>>('Internal Server Error');
        }
    }

    public async updateUser(u: IUserDTO): Promise<Result<IUserWithRoleDTO>> {
        try {
            // check if role exists
            const role = await this.getRole(u.role);

            if (role.isFailure) {
                return Result.fail<IUserWithRoleDTO>('Role doesnt exist!');
            }

            const user = await this.userRepo.findById(u.id);

            if (!user) {
                return Result.fail<IUserWithRoleDTO>('User not found');
            }

            user.email = UserEmail.create(u.email).getValue();
            user.username = u.username;
            user.role = role.getValue().id;

            await this.userRepo.save(user);

            const userDTO = UserMap.toDTO(user, role.getValue());

            return Result.ok<IUserWithRoleDTO>(userDTO);
        } catch (e) {
            this.logger.error(e);
            return Result.fail<IUserWithRoleDTO>('Internal Server Error');
        }
    }

    public async getUserById(userId: string): Promise<Result<IUserWithRoleDTO>> {
        try {
            const user = await this.userRepo.findById(userId);

            if (!user) {
                return Result.fail<IUserWithRoleDTO>('User not found');
            }

            // check if role exists
            const role = await this.getRole(user.role.toString());

            if (role.isFailure) {
                return Result.fail<IUserWithRoleDTO>('Role doesnt exist!');
            }

            const userDTO = UserMap.toDTO(user, role.getValue());

            return Result.ok<IUserWithRoleDTO>(userDTO);
        } catch (e) {
            this.logger.error(e);
            return Result.fail<IUserWithRoleDTO>('Internal Server Error');
        }
    }

    public async deleteUser(userId: string): Promise<Result<void>> {
        try {
            const user = await this.userRepo.findById(userId);

            if (!user) {
                return Result.fail<void>('User not found');
            }

            await this.userRepo.deleteById(userId);

            return Result.ok<void>();
        } catch (e) {
            this.logger.error(e);
            return Result.fail<void>('Internal Server Error');
        }
    }

    private generateToken(user: IUserWithRoleDTO) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 90);

        const id = user.id.toString();
        const email = user.email;
        const role = user.role.name;

        return jwt.sign(
            {
                id: id,
                email: email, // We are gonna use this in the middleware 'isAuth'
                role: role,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret,
        );
    }

    private async getRole(roleId: string): Promise<Result<Role>> {
        const role = await this.roleRepo.findByDomainId(roleId);
        const found = !!role;

        if (found) {
            return Result.ok<Role>(role);
        } else {
            return Result.fail<Role>("Couldn't find role by id=" + roleId);
        }
    }
}
