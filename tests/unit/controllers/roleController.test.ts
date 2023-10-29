// import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Result } from '../../../src/core/logic/Result';
import RoleController from '../../../src/controllers/roleController';
import IRoleDTO from '../../../src/dto/IRoleDTO';
import RoleService from '../../../src/services/roleService';
import RoleRepo from '../../../src/repos/roleRepo';
import RoleSchema from '../../../src/persistence/schemas/roleSchema';
import { SinonSpy } from 'sinon';

describe('Role Controller', function() {
    let roleRepo: RoleRepo;
    let service: RoleService;

    beforeEach(function() {
        roleRepo = new RoleRepo(RoleSchema);
        service = new RoleService(roleRepo);
    });

    afterEach(function() {
        sinon.restore();
    });

    it('roleController unit test using roleService stub (createRole())', async function() {
        // Arrange
        const body = {
            name: 'Example9',
        };
        const req: Partial<Request> = {};
        req.body = body;
        const res: Partial<Response> = {
            json: sinon.spy() as SinonSpy<[any?]>,
        };
        const next: Partial<NextFunction> = () => {};

        sinon.stub(service, 'createRole').resolves(
            Result.ok<IRoleDTO>({
                id: '123',
                name: req.body.name,
            }),
        );

        const ctrl = new RoleController(service);

        // Act
        await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
            sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
            sinon.assert.calledWith(
                res.json as SinonSpy<[any?]>,
                sinon.match({
                    id: '123',
                    name: req.body.name,
                }),
            );
        } catch (error) {
            console.log(error);

            throw error;
        }

        sinon.restore();
    });

    // it('roleController unit test using roleService stub (updateRole())', async function() {
    //     // Arrange
    //     const body = {
    //         id: '123',
    //         name: 'Example9',
    //     };
    //     const req: Partial<Request> = {};
    //     req.body = body;
    //     const res: Partial<Response> = {
    //         json: sinon.spy() as SinonSpy<[any?]>,
    //     };
    //     const next: Partial<NextFunction> = () => {};

    //     sinon.stub(service, 'updateRole').resolves(
    //         Result.ok<IRoleDTO>({
    //             id: '123',
    //             name: req.body.name,
    //         }),
    //     );

    //     const ctrl = new RoleController(service);

    //     // Act
    //     await ctrl.updateRole(<Request>req, <Response>res, <NextFunction>next);

    //     try {
    //         // Assert
    //         sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
    //         sinon.assert.calledWith(
    //             res.json as SinonSpy<[any?]>,
    //             sinon.match({
    //                 id: '123',
    //                 name: req.body.name,
    //             }),
    //         );
    //     } catch (error) {
    //         console.log(error);

    //         throw error;
    //     }

    //     sinon.restore();
    // });
});
