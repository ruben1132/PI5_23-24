// import * as sinon from 'sinon';

// import { Response, Request, NextFunction } from 'express';

// import { Container } from 'typedi';
// import config from '../../config';

// import { Result } from '../../src/core/logic/Result';

// import IRoleService from '../../src/services/IServices/IRoleService';
// import RoleServide from '../../src/services/roleService';
// import RoleController from '../../src/controllers/roleController';
// import IRoleDTO from '../../src/dto/IRoleDTO';

// describe('RoleController', function() {
//     it('createRole: returns json with id+name values', async function() {
//         try {
//             const body = { id: '123', name: 'role12' };
//             const req: Partial<Request> = {};
//             req.body = body;

//             const res: Partial<Response> = {
//                 json: sinon.spy(),
//             };
//             const next: Partial<NextFunction> = () => {};

//             const roleServiceClass = RoleServide;
//             const roleServiceInstance = Container.get(roleServiceClass);
//             Container.set(config.services.role.name, roleServiceInstance);

//             // Stub the createRole method
//             sinon.stub(roleServiceInstance, 'createRole').returns(
//                 Result.ok<IRoleDTO>({ id: req.body.id, name: req.body.name }),
//             );

//             const ctrl = new RoleController(roleServiceInstance as IRoleService);

//             await ctrl.createRole(<Request>req, <Response>res, <NextFunction>next);

//             sinon.assert.calledOnce(res.json);
//             sinon.assert.calledWith(res.json, sinon.match({ id: req.body.id, name: req.body.name }));

//             // Add some debugging statements
//             console.log('Test successful');
//         } catch (error) {
//             // Handle any errors that occur during the test
//             console.error('Test failed:', error);
//             throw error; // Rethrow the error to mark the test as failed
//         }
//     });

//     it('getRoles: returns json with an array of roles', async function() {
//         try {
//             const roles = [
//                 { id: '123', name: 'role12' },
//                 { id: '456', name: 'role34' },
//             ];
//             const req: Partial<Request> = {};
//             const res: Partial<Response> = {
//                 json: sinon.spy(),
//             };
//             const next: Partial<NextFunction> = () => {};

//             const roleServiceClass = RoleServide;
//             const roleServiceInstance = Container.get(roleServiceClass);
//             Container.set(config.services.role.name, roleServiceInstance);

//             // Stub the getRoles method
//             sinon.stub(roleServiceInstance, 'getRoles').returns(Result.ok<IRoleDTO[]>(roles));

//             const ctrl = new RoleController(roleServiceInstance as IRoleService);

//             await ctrl.getRoles(<Request>req, <Response>res, <NextFunction>next);

//             sinon.assert.calledOnce(res.json);
//             sinon.assert.calledWith(res.json, sinon.match(roles));

//             // Add some debugging statements
//             console.log('Test successful');
//         } catch (error) {
//             // Handle any errors that occur during the test
//             console.error('Test failed:', error);
//             throw error; // Rethrow the error to mark the test as failed
//         }
//     });

//     it('getRoleById: returns json with a single role', async function() {
//         try {
//             const role = { id: '123', name: 'role12' };
//             const req: Partial<Request> = { params: { id: role.id } };
//             const res: Partial<Response> = {
//                 json: sinon.spy(),
//             };
//             const next: Partial<NextFunction> = () => {};

//             const roleServiceClass = RoleServide;
//             const roleServiceInstance = Container.get(roleServiceClass);
//             Container.set(config.services.role.name, roleServiceInstance);

//             // Stub the getRoleById method
//             sinon.stub(roleServiceInstance, 'getRoleById').returns(Result.ok<IRoleDTO>(role));

//             const ctrl = new RoleController(roleServiceInstance as IRoleService);

//             await ctrl.getRoleById(<Request>req, <Response>res, <NextFunction>next);

//             sinon.assert.calledOnce(res.json);
//             sinon.assert.calledWith(res.json, sinon.match(role));

//             // Add some debugging statements
//             console.log('Test successful');
//         } catch (error) {
//             // Handle any errors that occur during the test
//             console.error('Test failed:', error);
//             throw error; // Rethrow the error to mark the test as failed
//         }
//     });

//     it('deleteRole: returns success message when role is deleted', async function() {
//         try {
//             const req: Partial<Request> = { params: { id: '123' } };
//             const res: Partial<Response> = {
//                 status: sinon.stub().returnsThis(),
//                 send: sinon.spy(),
//             };
//             const next: Partial<NextFunction> = () => {};

//             const roleServiceClass = RoleServide;
//             const roleServiceInstance = Container.get(roleServiceClass);
//             Container.set(config.services.role.name, roleServiceInstance);

//             // Stub the deleteRole method
//             sinon.stub(roleServiceInstance, 'deleteRole').returns(Result.ok<void>());

//             const ctrl = new RoleController(roleServiceInstance as IRoleService);

//             await ctrl.deleteRole(<Request>req, <Response>res, <NextFunction>next);

//             sinon.assert.calledOnce(res.status);
//             sinon.assert.calledWith(res.status, 200);
//             sinon.assert.calledOnce(res.send);
//             sinon.assert.calledWith(res.send, sinon.match({ Success: 'Role deleted successfully' }));

//             // Add some debugging statements
//             console.log('Test successful');
//         } catch (error) {
//             // Handle any errors that occur during the test
//             console.error('Test failed:', error);
//             throw error; // Rethrow the error to mark the test as failed
//         }
//     });

//     // it('deleteRole: returns error message when role is not found', async function() {
//     //     try {
//     //         const req: Partial<Request> = { params: { id: '123' } };
//     //         const res: Partial<Response> = {
//     //             status: sinon.stub().returnsThis(),
//     //             send: sinon.spy(),
//     //         };
//     //         const next: Partial<NextFunction> = () => {};

//     //         const roleServiceClass = RoleServide;
//     //         const roleServiceInstance = Container.get(roleServiceClass);
//     //         Container.set(config.services.role.name, roleServiceInstance);

//     //         // Stub the deleteRole method
//     //         sinon.stub(roleServiceInstance, 'deleteRole').returns(Result.fail<void>('Role not found'));

//     //         const ctrl = new RoleController(roleServiceInstance as IRoleService);

//     //         await ctrl.deleteRole(<Request>req, <Response>res, <NextFunction>next);

//     //         sinon.assert.calledOnce(res.status);
//     //         sinon.assert.calledWith(res.status, 400);
//     //         sinon.assert.calledOnce(res.send);
//     //         sinon.assert.calledWith(res.send, sinon.match({ error: 'Role not found' }));

//     //         // Add some debugging statements
//     //         console.log('Test successful');
//     //     } catch (error) {
//     //         // Handle any errors that occur during the test
//     //         // console.error('Test failed:', error);
//     //         throw error; // Rethrow the error to mark the test as failed
//     //     }
//     // });

//     it('updateRole: returns json with updated role', async function() {
//         try {
//             const body = { id: '123', name: 'role12' };
//             const req: Partial<Request> = {};
//             req.body = body;

//             const res: Partial<Response> = {
//                 json: sinon.spy(),
//                 status: sinon.stub().returnsThis(),
//                 send: sinon.spy(),
//             };
//             const next: Partial<NextFunction> = () => {};

//             const roleServiceClass = RoleServide;
//             const roleServiceInstance = Container.get(roleServiceClass);
//             Container.set(config.services.role.name, roleServiceInstance);

//             // Stub the updateRole method
//             sinon.stub(roleServiceInstance, 'updateRole').returns(
//                 Result.ok<IRoleDTO>({ id: req.body.id, name: req.body.name }),
//             );

//             const ctrl = new RoleController(roleServiceInstance as IRoleService);

//             await ctrl.updateRole(<Request>req, <Response>res, <NextFunction>next);

//             sinon.assert.calledOnce(res.json);
//             sinon.assert.calledWith(res.json, sinon.match({ id: req.body.id, name: req.body.name }));

//             // Add some debugging statements
//             console.log('Test successful');
//         } catch (error) {
//             // Handle any errors that occur during the test
//             console.error('Test failed:', error);
//             throw error; // Rethrow the error to mark the test as failed
//         }
//     });
// });
