import { Service, Inject } from 'typedi';

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

    public async createUser(newUser: IUserDTO): Promise<Result<IUserWithRoleDTO>> {
        try {
            const userAlreadyExists = await this.userRepo.findByEmail(newUser.email);

            if (userAlreadyExists) {
                return Result.fail<IUserWithRoleDTO>('User already exists with the given email');
            }

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
                userDTO.password = '';
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

            // check if email is already taken
            const userAlreadyExists = await this.userRepo.findByEmail(u.email);

            if (userAlreadyExists && userAlreadyExists.id.toString() !== u.id) {
                return Result.fail<IUserWithRoleDTO>('User already exists with the given email');
            }

            user.email = UserEmail.create(u.email).getValue();
            user.username = u.username;
            user.role = role.getValue().id;
            if (u.password) {
                const hashedPassword = await bcrypt.hash(u.password, 10); // 10 is the number of salt rounds
                user.password = UserPassword.create({ value: hashedPassword }).getValue();
            }

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
