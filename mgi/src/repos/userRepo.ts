import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from '../services/IRepos/IUserRepo';
import { User } from '../domain/user';
import { UserId } from '../domain/valueObj/userId';
import { UserEmail } from '../domain/valueObj/userEmail';
import { UserMap } from '../mappers/UserMap';

@Service()
export default class UserRepo implements IUserRepo {
    private models: any;

    constructor(
        @Inject('userSchema') private userSchema: Model<IUserPersistence & Document>,
        @Inject('logger') private logger,
    ) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(userId: UserId | string): Promise<boolean> {
        const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

        const query = { domainId: idX };
        const userDocument = await this.userSchema.findOne(query);

        return !!userDocument === true;
    }

    public async save(user: User): Promise<User> {
        const query = { domainId: user.id.toString() };

        const userDocument = await this.userSchema.findOne(query);

        try {
            if (userDocument === null) {
                const rawUser: any = UserMap.toPersistence(user);

                const userCreated = await this.userSchema.create(rawUser);

                return UserMap.toDomain(userCreated);
            } else {
                userDocument.username = user.username;
                userDocument.password = user.password.value;
                userDocument.email = user.email.value;
                await userDocument.save();

                return user;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByEmail(email: UserEmail | string, userdId?: string): Promise<User> {
        const query = { email: email.toString() };
        if (userdId) {
            query['domainId'] = { $ne: userdId };
        }
        const userRecord = await this.userSchema.findOne(query);

        if (userRecord != null) {
            return UserMap.toDomain(userRecord);
        } else return null;
    }

    public async findById(userId: UserId | string): Promise<User> {
        const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

        const query = { domainId: idX };
        const userRecord = await this.userSchema.findOne(query);

        if (userRecord != null) {
            return UserMap.toDomain(userRecord);
        } else return null;
    }

    public async deleteById(userId: UserId | string): Promise<void> {
        const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

        const query = { domainId: idX };
        await this.userSchema.findOneAndDelete(query);
    }

    public async findAll(): Promise<User[]> {
        const userRecord = await this.userSchema.find();

        if (userRecord != null) {
            return userRecord.map(item => UserMap.toDomain(item));
        } else return null;
    }
}
