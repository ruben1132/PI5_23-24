import { Role } from '../../../src/domain/role';
import { RoleId } from '../../../src/domain/valueObj/roleId';
import { expect } from 'chai';

describe('Role', () => {
    describe('create', () => {
        it('should create a new Role instance', () => {
            const props = { name: 'admin' };
            const id = new RoleId();
            const role = Role.create(props, id);

            expect(role.isSuccess).to.be.true;
            expect(role.getValue()).to.be.instanceOf(Role);
            expect(props.name).to.equal(role.getValue().name);
            expect(id).to.equal(role.getValue().id);
        });
    });

    describe('name', () => {
        it('should set the name property', () => {
            const props = { name: 'admin' };
            const role = Role.create(props).getValue();

            expect(props.name).to.equal(role.name);

            role.name = 'user';

            expect('user').to.equal(role.name);
        });
    });

    describe('constructor', () => {
        it('should create a new Role instance with a generated ID', () => {
            const props = { name: 'admin' };
            const role = Role.create(props);

            expect(role.getValue()).to.be.instanceOf(Role);
            expect(props.name).to.equal(role.getValue().name);
            // expect(role.getValue().roleId).to.be.instanceOf(RoleId);
        });

        it('should create a new Role instance with a given ID', () => {
            const props = { name: 'admin' };
            const id = new RoleId();
            const role = Role.create(props, id);

            expect(role.getValue()).to.be.instanceOf(Role);
            expect(props.name).to.equal(role.getValue().name);
            expect(id).to.equal(role.getValue().id);
        });
    });

    describe('equals', () => {
        it('should return true if two Role instances have the same ID', () => {
            const props1 = { name: 'admin' };
            const props2 = { name: 'user' };
            const id = new RoleId();
            const role1 = Role.create(props1, id);
            const role2 = Role.create(props2, id);

            expect(role1.getValue().equals(role2.getValue())).to.be.true;
        });

        it('should return false if two Role instances have different IDs', () => {
            const props1 = { name: 'admin' };
            const props2 = { name: 'user' };
            const role1 = Role.create(props1);
            const role2 = Role.create(props2);

            expect(role1.getValue().equals(role2.getValue())).to.be.false;
        });
    });
});
