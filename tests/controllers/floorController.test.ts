import { expect } from 'chai';
import { Response, Request } from 'express';
import FloorController from '../../src/controllers/floorController';
import IFloorService from '../../src/services/IServices/IFloorService';
import sinon, { SinonStub } from 'sinon';
import { Result } from '../../src/core/logic/Result';
import IFloorDTO from '../../src/dto/IFloorDTO';

import FloorService from '../../src/services/floorService';
import { Container } from 'typedi';
import config from '../../config';


// describe('FloorController', () => {

//     // beforeEach(() => {
//     //     // Define a mock implementation of IFloorService methods
//     //     const floorService: IFloorService = {
//     //         createFloor: async (floorDTO) => {
//     //             // Implement the createFloor method to return a Result
//     //             // You can create a Result instance with the success value
//     //             return Promise.resolve(Result.ok({ domainId: '1', number: 1, information: 'Sample Floor', building: '1'}));
//     //         },
//     //         // Implement other methods

//     //         getFloors: async () => {
//     //             return Promise.resolve(Result.ok([{ domainId: '1', number: 1, information: 'Sample Floor', building: '1'}]));
//     //         },
//     //         getFloorsByBuildingId: async (buildingId) => {
//     //             return Promise.resolve(Result.ok([{ domainId: '1', number: 1, information: 'Sample Floor', building: '1'}]));
//     //         },
//     //         updateFloor: async (floorDTO) => {
//     //             return Promise.resolve(Result.ok({ domainId: '1', number: 1, information: 'Sample Floor', building: '1'}));
//     //         },
//     //         deleteFloor: async (floorDTO) => {
//     //             return Promise.resolve(Result.ok());
//     //         }

//     //     };

//     //     // Create a stub for the createFloor method
//     //     createFloorStub = sinon.stub(floorService, 'createFloor');

//     //     // Create the FloorController instance
//     //     floorController = new FloorController(floorService);

//     //     // Create mock Request, Response, and SinonSpy for 'next'

//     // });

//     // describe('createFloor', () => {
//     //     it('should return 201 status code and created floor', async () => {
//     //         // Stub the createFloor method to resolve with a success Result
//     //         createFloorStub.resolves(Result.ok({ domainId: '1', number: 1, information: 'Sample Floor', building: '1' }));

//     //         // Call the controller method that uses createFloor
//     //         await floorController.createFloor(req, res, next);

//     //         // Assertions
//     //         expect(res.status.calledWith(201)).to.be.true;
//     //         expect(res.json.calledOnce).to.be.true;
//     //         expect(res.json.firstCall.args[0]).to.deep.equal({ domainId: '1', number: 1, information: 'Sample Floor', building: '1' });
//     //         expect(next.called).to.be.false; // next should not have been called
//     //     });
//     // });

//     // Implement similar tests for other controller methods like getFloors, updateFloor, deleteFloor, etc.

//     // Clean up Sinon stubs after each test
//     // afterEach(() => {
//     //     sinon.restore();
//     // });
// });
