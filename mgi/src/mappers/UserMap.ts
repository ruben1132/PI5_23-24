import { Container } from 'typedi';

import { Mapper } from '../core/infra/Mapper';

import { IUserWithRoleDTO } from '../dto/IUserDTO';

import { User } from '../domain/user';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { UserEmail } from '../domain/valueObj/userEmail';
import { UserPassword } from '../domain/valueObj/userPassword';

import RoleRepo from '../repos/roleRepo';
import { Role } from '../domain/role';

export class UserMap extends Mapper<User> {
    public static toDTO(user: User, role: Role): IUserWithRoleDTO {
        return {
            id: user.id.toString(),
            username: user.username,
            email: user.email.value,
            password: '',
            role: {
                id: role.id.toString(),
                name: role.name,
            },
        } as IUserWithRoleDTO;
    }

    public static toDomain(raw: any): User {
        const userEmailOrError = UserEmail.create(raw.email);
        const userPasswordOrError = UserPassword.create({ value: raw.password, hashed: true });

        const userOrError = User.create(
            {
                username: raw.username,
                email: userEmailOrError.getValue(),
                password: userPasswordOrError.getValue(),
                role: raw.role,
            },
            new UniqueEntityID(raw.domainId),
        );

        userOrError.isFailure ? console.log(userOrError.error) : '';

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static toPersistence(user: User): any {
        const a = {
            domainId: user.id.toString(),
            email: user.email.value,
            password: user.password.value,
            username: user.username,
            role: user.role.toString(),
        };
        return a;
    }
}
