import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IRoleService from '../src/services/IServices/IRoleService';
import RoleController from '../src/controllers/roleController';
import IRoleDTO from '../src/dto/IRoleDTO';
import { Role } from '../src/domain/role';

import RoleRepo from '../src/repos/roleRepo';

import RoleService from '../src/services/roleService';

describe('role controller', function() {
    const sandbox = sinon.createSandbox();

    beforeEach(function() {
        Container.reset();
        const roleSchemaInstance = require('../src/persistence/schemas/roleSchema').default;
        Container.set('roleSchema', roleSchemaInstance);

        const roleRepoClass = require('../src/repos/roleRepo').default;
        const roleRepoInstance = Container.get(roleRepoClass);
        Container.set('RoleRepo', roleRepoInstance);

        const roleServiceClass = require('../src/services/roleService').default;
        const roleServiceInstance = Container.get(roleServiceClass);
        Container.set('RoleService', roleServiceInstance);
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('roleController unit test using roleService stub', async function() {
        // Arrange
        const body = { name: 'role12' };
        const req: Partial<Request> = {};
        req.body = body;
        const res: Partial<Response> = {
            json: sinon.spy(),
        };
        const next: Partial<NextFunction> = () => {};

        const roleServiceInstance = Container.get('RoleService');
        sinon.stub(roleServiceInstance, 'createRole').returns(
            Result.ok<IRoleDTO>({ id: '123', name: req.body.name }),
        );

        const ctrl = new RoleController(roleServiceInstance as IRoleService);

        // Act
        await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ id: '123', name: req.body.name }));
    });

    it('should test roleController createRole with stubs', async function() {
        // Arrange
        const body = { name: 'role12' };
        const req: Partial<Request> = { body };

        const res: Partial<Response> = { json: sinon.spy() };
        const next: Partial<NextFunction> = () => {};

        // Create a stub for your RoleService.createRole method
        const roleServiceInstance = sinon.createStubInstance(RoleService);
        roleServiceInstance.createRole.returns({ id: '123', name: req.body.name });

        // Create a stub for your RoleRepo.save method
        const roleRepoInstance = sinon.createStubInstance(RoleRepo);
        roleRepoInstance.save.resolves({ name: req.body.name }); // Assuming save returns a promise

        const ctrl = new RoleController(roleServiceInstance);

        // Act
        await ctrl.createRole(req as Request, res as Response, next as NextFunction);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, { id: '123', name: req.body.name });
    });

    // it('should test roleController createRole with spy on roleService', async function() {
    //     // Arrange
    //     const body = { name: 'role12' };
    //     const req: Partial<Request> = { body };

    //     const res: Partial<Response> = { json: sinon.spy() };
    //     const next: Partial<NextFunction> = () => {};

    //     // Create an instance of your RoleService
    //     const roleServiceInstance = new RoleService(RoleRepo as any);

    //     // Spy on the createRole method of the actual service
    //     const roleServiceSpy = sinon.spy(roleServiceInstance, 'createRole');

    //     const ctrl = new RoleController(roleServiceInstance as any);

    //     // Act
    //     await ctrl.createRole(req as Request, res as Response, next as NextFunction);

    //     // Assert
    //     sinon.assert.calledOnce(res.json);
    //     sinon.assert.calledWith(res.json, { id: '123', name: req.body.name });

    //     // Ensure the createRole method of the service is called
    //     sinon.assert.calledOnce(roleServiceSpy);
    //     sinon.assert.calledWith(roleServiceSpy, { name: req.body.name });
    // });

    it('roleController unit test using roleService mock', async function() {
        // Arrange
        const body = { name: 'role12' };
        const req: Partial<Request> = {};
        req.body = body;

        const res: Partial<Response> = {
            json: sinon.spy(),
        };
        const next: Partial<NextFunction> = () => {};

        const roleServiceInstance = Container.get('RoleService');
        const roleServiceMock = sinon.mock(roleServiceInstance, 'createRole');
        roleServiceMock
            .expects('createRole')
            .once()
            .withArgs(sinon.match({ name: req.body.name }))
            .returns(
                Result.ok<IRoleDTO>({ id: '123', name: req.body.name }),
            );

        const ctrl = new RoleController(roleServiceInstance as IRoleService);

        // Act
        await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        roleServiceMock.verify();
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ id: '123', name: req.body.name }));
    });
});

//             );
//
