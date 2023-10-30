import { Role } from '../../../src/domain/role';
import { RoleId } from '../../../src/domain/valueObj/roleId';
import { expect } from 'chai';

describe('Role', () => {
    describe('create', () => {
        it('should create a new Role instance', () => {
            const props = { name: 'admin' };
            const id = new RoleId("123");
            const role = Role.create(props, id);

            expect(role.isSuccess).to.be.true;
            expect(role.getValue()).to.be.instanceOf(Role);
            expect(props.name).to.equal(role.getValue().name);
            expect(id).to.equal(role.getValue().id);
        });
    });
});
