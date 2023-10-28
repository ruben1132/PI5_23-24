// import 'reflect-metadata';
// import { Container } from 'typedi';
// import * as sinon from 'sinon';
// import { Response, Request, NextFunction } from 'express';
// import { Result } from '../../src/core/logic/Result';
// import BuildingController from '../../src/controllers/buildingController';
// import IBuildingDTO from '../../src/dto/IBuildingDTO';
// import IBuildingService from '../../src/services/IServices/IBuildingService';
// import config from "../../config";
// import { SinonSpy } from 'sinon';

// describe('Building Controller', function () {
//     let buildingServiceClass = require(config.services.building.path).default;
//     let buildingServiceInstance = Container.get<IBuildingService>(buildingServiceClass);
//     Container.set(config.services.building.name, buildingServiceInstance);

//     beforeEach(function () {

//     });

//     afterEach(function () {
//         sinon.restore();
//     });

//     it('buildingController unit test using buildingService stub', async function () {

//         // Arrange
//         let body = { "code": 'A', "dimensions": '10x10', "name": 'Building A' };
//         let req: Partial<Request> = {};
//         req.body = body;
//         let res: Partial<Response> = {
//             json: sinon.spy() as SinonSpy<[any?]>
//         };
//         let next: Partial<NextFunction> = () => { };

//         sinon.stub(buildingServiceInstance, "createBuilding").resolves(Result.ok<IBuildingDTO>({
//             "id": "123",
//             "code": req.body.code,
//             "dimensions": req.body.description, "name": req.body.name
//         }
//         ));

//         const ctrl = new BuildingController(buildingServiceInstance);

//         // Act
//         await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

//         try {
//             // Assert
//             sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
//             sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({
//                 "id": "123",
//                 "code": req.body.code,
//                 "description": req.body.description,
//                 "name": req.body.name
//             }));

//         } catch (error) {
//             console.log(error);
            
//             throw error;
//         }

//         sinon.restore();

//         console.log("buildingController unit test using buildingService stub: PASSED");
        

//     });
// });

