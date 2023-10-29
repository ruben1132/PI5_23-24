import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../src/core/logic/Result';
import IRoleService from '../../src/services/IServices/IRoleService';
import RoleController from '../../src/controllers/roleController';
import RoleService from '../../src/services/roleService';
import RoleRepo from '../../src/repos/roleRepo';
import { Role } from '../../src/domain/role';
import IRoleDTO from '../../src/dto/IRoleDTO';
import { SinonSpy } from 'sinon';
import { UniqueEntityID } from '../../src/core/domain/UniqueEntityID';
import RoleSchema from '../../src/persistence/schemas/roleSchema';

describe('Role X Controller', function() {
    const sandbox = sinon.createSandbox();

    let roleSchema: typeof RoleSchema;
    let roleRepo: RoleRepo;
    let roleService: RoleService;

    beforeEach(function() {
        Container.reset();
        roleSchema = RoleSchema;

        roleRepo = new RoleRepo(roleSchema);
        roleService = new RoleService(roleRepo);
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('roleController unit test using roleService stub', async function() {
        // Arrange
        const body = { name: 'roleTest1' };
        const req: Partial<Request> = {};
        req.body = body;
        const res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>,
        };
        const next: Partial<NextFunction> = () => {};

        sinon.stub(roleService, "createRole").returns(Promise.resolve(Result.ok<IRoleDTO>({ "id": "123", "name": req.body.name })));

        const ctrl = new RoleController(roleService as IRoleService);

        // Act
        await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ id: '123', name: req.body.name }));
    });

    it('roleController unit test using roleService stub', async function() {
        // Arrange
        const body = { name: 'roleTest1' };
        const req: Partial<Request> = {};
        req.body = body;
        const res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>,
        };
        const next: Partial<NextFunction> = () => {};

        sinon.stub(roleService, "createRole").returns(Promise.resolve(Result.ok<IRoleDTO>({ "id": "123", "name": req.body.name })));

        const ctrl = new RoleController(roleService as IRoleService);

        // Act
        await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ id: '123', name: req.body.name }));
    });

    it('roleController + roleService integration test using roleRepoistory and Role stubs', async function() {
        // Arrange
        const body = { name: 'roleTest1' };
        const req: Partial<Request> = {};
        req.body = body;

        const res: Partial<Response> = {
            json: sinon.spy(),
        };
        const next: Partial<NextFunction> = () => {};

        const r = Role.create({ name: req.body.name }, new UniqueEntityID('123'));

        sinon.stub(roleRepo, "save").returns(new Promise<Role>((resolve, reject) => {
            resolve(Role.create({ "name": req.body.name }, new UniqueEntityID("123")).getValue())
        }));

        const ctrl = new RoleController(roleService as IRoleService);

        // Act
        await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ id: '123', name: req.body.name }));
    });


    it('roleController + roleService integration test using spy on roleService', async function () {
		// Arrange
        let body = { "name":'roleTest1' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

        sinon.stub(roleRepo, "save").returns(new Promise<Role>((resolve, reject) => {
            resolve(Role.create({ "name": req.body.name }, new UniqueEntityID("123")).getValue())
        }));


		const roleServiceSpy = sinon.spy(roleService, "createRole");

		const ctrl = new RoleController(roleService as IRoleService);

		// Act
		await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
		sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ "id": "123","name": req.body.name}));
		sinon.assert.calledOnce(roleServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(roleServiceSpy, sinon.match({name: req.body.name}));
	});

    it('roleController unit test using roleService mock', async function () {
        // Arrange
        const body = { name: 'roleTest1' };
        const req: Partial<Request> = {};
        req.body = body;

        const res: Partial<Response> = {
            json: sinon.spy(),
        };
        const next: Partial<NextFunction> = () => {};

        const roleServiceMock = sinon.mock(roleService)
        roleServiceMock.expects("createRole")
            .once()
            .withArgs(sinon.match({ name: req.body.name }))
            .returns(
                Result.ok<IRoleDTO>({ id: '123', name: req.body.name }),
            );

        const ctrl = new RoleController(roleService as IRoleService);

        // Act
        await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        roleServiceMock.verify();
        sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
        sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ id: '123', name: req.body.name }));
    });
});
