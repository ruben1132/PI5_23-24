import { User } from "../../../src/domain/user";
import { Role } from "../../../src/domain/role";
import { UserEmail } from "../../../src/domain/valueObj/userEmail";
import { UserPassword } from "../../../src/domain/valueObj/userPassword";
import { expect } from 'chai';

describe('User', () => {
    const validUserProps = {
        firstName: 'John',
        lastName: 'Doe',
        email: UserEmail.create('johndoe@example.com').getValue(),
        password: UserPassword.create({
            value: 'password123',
            hashed: false
        }).getValue(),
        role: Role.create({
            name: 'user',
        }).getValue()
    };

    describe('create', () => {
        it('should create a new user instance with valid properties', () => {
            const userOrError = User.create(validUserProps);

            expect(userOrError.isSuccess).to.be.true;
            const user = userOrError.getValue();
            expect(validUserProps.firstName).to.be.equal(user.firstName);
            expect(validUserProps.lastName).to.be.equal(user.lastName);
            expect(validUserProps.email).to.be.equal(user.email);
            expect(validUserProps.password).to.be.equal(user.password);
            expect(validUserProps.role).to.be.equal(user.role);
        });

        it('should fail to create a new user instance with first name set to null', () => {
            const userOrError = User.create({
                firstName: null,
                lastName: 'Doe',
                email: validUserProps.email,
                password: validUserProps.password,
                role: validUserProps.role
            });

            expect(userOrError.isFailure).to.be.true;
            expect('firstName is null or undefined').to.be.equal(userOrError.errorValue());
        });

        it('should fail to create a new user instance with last name set to null', () => {
            const userOrError = User.create({
                firstName: 'John',
                lastName: null,
                email: validUserProps.email,
                password: validUserProps.password,
                role: validUserProps.role
            });

            expect(userOrError.isFailure).to.be.true;
            expect('lastName is null or undefined').to.be.equal(userOrError.errorValue());
        });

        it('should fail to create a new user instance with email set to null', () => {
            const userOrError = User.create({
                firstName: 'John',
                lastName: 'Doe',
                email: null,
                password: validUserProps.password,
                role: validUserProps.role
            });

            expect(userOrError.isFailure).to.be.true;
            expect('email is null or undefined').to.be.equal(userOrError.errorValue());
        });

        it('should fail to create a new user instance with password set to null', () => {
            const userOrError = User.create({
                firstName: 'John',
                lastName: 'Doe',
                email: validUserProps.email,
                password: null,
                role: validUserProps.role
            });

            expect(userOrError.isFailure).to.be.true;
            expect('password is null or undefined').to.be.equal(userOrError.errorValue());
        });

        it('should fail to create a new user instance with role set to null', () => {
            const userOrError = User.create({
                firstName: 'John',
                lastName: 'Doe',
                email: validUserProps.email,
                password: validUserProps.password,
                role: null
            });

            expect(userOrError.isFailure).to.be.true;
            expect('role is null or undefined').to.be.equal(userOrError.errorValue());
        });

        it('should fail to create a new user instance with empty first name', () => {
            const invalidUserProps = {
                firstName: '',
                lastName: 'Doe',
                email: validUserProps.email,
                password: validUserProps.password,
                role: validUserProps.role
            };

            const userOrError = User.create(invalidUserProps);

            expect(userOrError.isFailure).to.be.true;
            expect('firstName is empty').to.be.equal(userOrError.errorValue());
        });

        it('should fail to create a new user instance with empty last name', () => {
            const invalidUserProps = {
                firstName: 'John',
                lastName: '',
                email: validUserProps.email,
                password: validUserProps.password,
                role: validUserProps.role
            };

            const userOrError = User.create(invalidUserProps);

            expect(userOrError.isFailure).to.be.true;
            expect('lastName is empty').to.be.equal(userOrError.errorValue());
        });

        it('should fail to create an empty email', () => {
            const invalidEmail = UserEmail.create('');

            expect(invalidEmail.isFailure).to.be.true;
            expect('email is empty').to.be.equal(invalidEmail.errorValue());
        });

        it('should fail to create an empty password', () => {
            const invalidPassword = UserPassword.create({
                value: '',
                hashed: false
            })

            expect(invalidPassword.isFailure).to.be.true;
            expect('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].').to.be.equal(invalidPassword.errorValue());
        });

        it('should fail to create an empty role', () => {
            const invalidEmail = Role.create({ name: '' });

            expect(invalidEmail.isFailure).to.be.true;
            expect('Must provide a role name').to.be.equal(invalidEmail.errorValue());
        });


    });

});