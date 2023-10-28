// import 'reflect-metadata';

// import * as sinon from 'sinon';
// import { Response, Request, NextFunction } from 'express';
// import { Container } from 'typedi';
// import { Result } from '../src/core/logic/Result';
// import IBuildingService from '../src/services/IServices/IBuildingService';
// import BuildingController from '../src/controllers/buildingController';
// import IBuildingDTO from '../src/dto/IBuildingDTO';
// import { Building } from '../src/domain/building';

// import BuildingRepo from '../src/repos/buildingRepo';

// import BuildingService from '../src/services/buildingService';

// describe('building controller', function() {
//     const sandbox = sinon.createSandbox();

//     beforeEach(function() {
//         Container.reset();
//         const buildingSchemaInstance = require('../src/persistence/schemas/buildingSchema').default;
//         Container.set('buildingSchema', buildingSchemaInstance);

//         const buildingRepoClass = require('../src/repos/buildingRepo').default;
//         const buildingRepoInstance = Container.get(buildingRepoClass);
//         Container.set('BuildingRepo', buildingRepoInstance);

//         const buildingServiceClass = require('../src/services/buildingService').default;
//         const buildingServiceInstance = Container.get(buildingServiceClass);
//         Container.set('BuildingService', buildingServiceInstance);
//     });

//     afterEach(function() {
//         sandbox.restore();
//     });

//     it('buildingController unit test using buildingService stub', async function() {
//         // Arrange
//         const body = { name: 'building12' };
//         const req: Partial<Request> = {};
//         req.body = body;
//         const res: Partial<Response> = {
//             json: sinon.spy(),
//         };
//         const next: Partial<NextFunction> = () => {};

//         const buildingServiceInstance = Container.get('BuildingService');
//         sinon.stub(buildingServiceInstance, 'createBuilding').returns(
//             Result.ok<IBuildingDTO>({ "id": "123", "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions }),
//         );

//         const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

//         // Act
//         await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

//         // Assert
//         sinon.assert.calledOnce(res.json);
//         sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions }));
//     });

//     // it('should test buildingController createBuilding with stubs', async function() {
//     //     // Arrange
//     //     const body = { name: 'building12' };
//     //     const req: Partial<Request> = { body };

//     //     const res: Partial<Response> = { json: sinon.spy() };
//     //     const next: Partial<NextFunction> = () => {};

//     //     // Create a stub for your BuildingService.createBuilding method
//     //     const buildingServiceInstance = sinon.createStubInstance(BuildingService);
//     //     buildingServiceInstance.createBuilding.returns({ "id": "123", "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions });

//     //     // Create a stub for your BuildingRepo.save method
//     //     const buildingRepoInstance = sinon.createStubInstance(BuildingRepo);
//     //     buildingRepoInstance.save.resolves({ name: req.body.name }); // Assuming save returns a promise

//     //     const ctrl = new BuildingController(buildingServiceInstance);

//     //     // Act
//     //     const createBuilding = await ctrl.createBuilding(req as Request, res as Response, next as NextFunction);

//     //     // Assert
//     //     sinon.assert.calledOnce(res.json);
//     //     sinon.assert.calledWith(res.json, { "id": "123", "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions });
//     // });

//     // it('should test buildingController createBuilding with spy on buildingService', async function() {
//     //     // Arrange
//     //     const body = { name: 'building12' };
//     //     const req: Partial<Request> = { body };

//     //     const res: Partial<Response> = { json: sinon.spy() };
//     //     const next: Partial<NextFunction> = () => {};

//     //     // Create an instance of your BuildingService
//     //     const buildingServiceInstance = new BuildingService(BuildingRepo as any);

//     //     // Spy on the createBuilding method of the actual service
//     //     const buildingServiceSpy = sinon.spy(buildingServiceInstance, 'createBuilding');

//     //     const ctrl = new BuildingController(buildingServiceInstance as any);

//     //     // Act
//     //     await ctrl.createBuilding(req as Request, res as Response, next as NextFunction);

//     //     // Assert
//     //     sinon.assert.calledOnce(res.json);
//     //     sinon.assert.calledWith(res.json, { "id": "123", "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions });

//     //     // Ensure the createBuilding method of the service is called
//     //     sinon.assert.calledOnce(buildingServiceSpy);
//     //     sinon.assert.calledWith(buildingServiceSpy, { name: req.body.name });
//     // });

//     it('buildingController unit test using buildingService mock', async function() {
//         // Arrange
//         const body = { name: 'building12' };
//         const req: Partial<Request> = {};
//         req.body = body;

//         const res: Partial<Response> = {
//             json: sinon.spy(),
//         };
//         const next: Partial<NextFunction> = () => {};

//         const buildingServiceInstance = Container.get('BuildingService');
//         const buildingServiceMock = sinon.mock(buildingServiceInstance, 'createBuilding');
//         buildingServiceMock
//             .expects('createBuilding')
//             .once()
//             .withArgs(sinon.match({ name: req.body.name }))
//             .returns(
//                 Result.ok<IBuildingDTO>({ "id": "123", "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions }),
//             );

//         const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

//         // Act
//         await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

//         // Assert
//         buildingServiceMock.verify();
//         sinon.assert.calledOnce(res.json);
//         sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "name": req.body.name, "code": req.body.code, "dimensions": req.body.dimensions }));
//     });
// });

// //             );
// //
