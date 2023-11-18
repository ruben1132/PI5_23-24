import { Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import * as bcrypt from 'bcrypt';

import { UserMap } from '../mappers/UserMap';
import { IUserSignupDTO, IUserWithRoleDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';
import { Role } from '../domain/role';

import { Result } from '../core/logic/Result';
import IAuthService from './IServices/IAuthService';
import { User } from '../domain/user';
import { UserEmail } from '../domain/valueObj/userEmail';
import { UserPassword } from '../domain/valueObj/userPassword';

@Service()
export default class AuthService implements IAuthService {
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

    public async signup(userDTO: IUserSignupDTO): Promise<Result<{ userDTO: IUserWithRoleDTO; token: string }>> {
        try {
            const userAlreadyExists = await this.userRepo.findByEmail(userDTO.email);

            if (userAlreadyExists) {
                return Result.fail<{ userDTO: IUserWithRoleDTO; token: string }>('User already exists');
            }

            const role = await this.getRole(userDTO.role.toString());

            if (role.isFailure) {
                return Result.fail<{ userDTO: IUserWithRoleDTO; token: string }>('Role doesnt exist!');
            }

            const password = await bcrypt.hash(userDTO.password, 10);

            const userOrError = User.create({
                username: userDTO.username,
                email: UserEmail.create(userDTO.email).getValue(),
                password: UserPassword.create({ value: password }).getValue(),
                role: role.getValue().id,
            });

            if (userOrError.isFailure) {
                return Result.fail<{ userDTO: IUserWithRoleDTO; token: string }>(userOrError.errorValue());
            }

            const user = userOrError.getValue();

            await this.userRepo.save(user);

            const userWithRoleDTO = UserMap.toDTO(user, role.getValue());

            const token = this.generateToken(userWithRoleDTO);

            return Result.ok<{ userDTO: IUserWithRoleDTO; token: string }>({ userDTO: userWithRoleDTO, token });
        } catch (e) {
            this.logger.error(e);
            return Result.fail<{ userDTO: IUserWithRoleDTO; token: string }>('Internal Server Error');
        }
    }

    public async session(token: string): Promise<Result<IUserWithRoleDTO>> {
        try {
            const decoded = jwt.verify(token, config.jwtSecret) as {
                id: string;
                email: string;
                role: string;
                exp: number;
            };

            const user = await this.userRepo.findById(decoded.id);

            if (!user) {
                return Result.fail<IUserWithRoleDTO>('User not found');
            }

            // get role
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
