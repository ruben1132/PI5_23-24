// import { expect } from 'chai';
// import sinon from 'sinon';
// import { Container } from 'typedi';
// import { Request, Response } from 'express';
// import { Result } from '../../src/core/logic/Result';
// import ElevatorController from '../../src/controllers/elevatorController';
// import IElevatorService from '../../src/services/IServices/IElevatorService';
// import IElevatorDTO from '../../src/dto/IElevatorDTO';

// describe('ElevatorController', () => {
//     let elevatorController: ElevatorController;
//     let elevatorService: IElevatorService;

//     beforeEach(() => {
//         elevatorService = {
//             // mock implementation of elevatorService methods
//             // ...
//             createElevator: sinon.stub(),
//             getElevators: sinon.stub(),
//             deleteElevator: sinon.stub(),

//         } as IElevatorService;

//         Container.set('elevatorService', elevatorService);
//         elevatorController = Container.get(ElevatorController);
//     });

//     describe('createElevator', () => {
//         it('should return a new elevator when the request is valid', async () => {
//             // Arrange
//             const req = {
//                 body: {
//                     // valid elevator data
//                     domainId: 'elevator_id',
//                     designation: 'E1',
//                     floorsAllowed: ['1', '2', '3', '4', '5'],
//                 },
//             } as Request;

//             const res = {
//                 json: sinon.spy(),
//                 status: sinon.stub().returns({
//                     json: sinon.spy(),
//                 }),
//             } as Response;

//             const next = sinon.spy();
//             const expectedResult = Result.ok({
//                 // expected elevator data
//                 domainId: 'elevator_id',
//                 designation: 'E1',
//                 floorsAllowed: ['1', '2', '3', '4', '5'],
//             });
//             sinon.stub(elevatorService, 'createElevator').returns(Promise.resolve(expectedResult));

//             // Act
//             await elevatorController.createElevator(req, res, next);

//             // Assert
//             const statusStub = res.status as sinon.SinonStub;
//             const jsonStub = res.json as sinon.SinonStub;

//             expect(statusStub.calledOnce).to.be.true;
//             expect(statusStub.calledWith(201)).to.be.true;
//             expect(jsonStub.calledOnce).to.be.true;
//             expect(jsonStub.calledWith(expectedResult.getValue())).to.be.true;
//         });

//         // it('should return an error when the request is invalid', async () => {
//         //     // Arrange
//         //     const req = {
//         //         body: {
//         //             // invalid elevator data
//         //         }
//         //     } as Request;
//         //     const res = {
//         //         status: sinon.stub().returns({
//         //             send: sinon.spy()
//         //         })
//         //     } as unknown as Response;
//         //     const next = sinon.spy();
//         //     const expectedResult = Result.fail<IElevatorDTO>('Invalid elevator data');
//         //     sinon.stub(elevatorService, 'createElevator').resolves(expectedResult);

//         //     // Act
//         //     await elevatorController.createElevator(req, res, next);

//         //     // Assert
//         //     expect(res.status.calledOnce).to.be.true;
//         //     expect(res.status.calledWith(400)).to.be.true;
//         //     expect(res.status().send.calledOnce).to.be.true;
//         //     expect(res.status().send.calledWith({ error: expectedResult.errorValue() })).to.be.true;
//         // });
//     });

//     // describe('getElevators', () => {
//     //     it('should return a list of elevators', async () => {
//     //         // Arrange
//     //         const req = {} as Request;
//     //         const res = {
//     //             json: sinon.spy(),
//     //             status: sinon.stub().returns({
//     //                 json: sinon.spy()
//     //             })
//     //         } as unknown as Response;
//     //         const next = sinon.spy();
//     //         const expectedResult = Result.ok<Array<IElevatorDTO>>([
//     //             // expected elevator data
//     //         ]);
//     //         sinon.stub(elevatorService, 'getElevators').resolves(expectedResult);

//     //         // Act
//     //         await elevatorController.getElevators(req, res, next);

//     //         // Assert
//     //         expect(res.status.calledOnce).to.be.true;
//     //         expect(res.status.calledWith(201)).to.be.true;
//     //         expect(res.json.calledOnce).to.be.true;
//     //         expect(res.json.calledWith(expectedResult.getValue())).to.be.true;
//     //     });

//     //     it('should return an error when the request fails', async () => {
//     //         // Arrange
//     //         const req = {} as Request;
//     //         const res = {
//     //             status: sinon.stub().returns({
//     //                 send: sinon.spy()
//     //             })
//     //         } as unknown as Response;
//     //         const next = sinon.spy();
//     //         const expectedResult = Result.fail<Array<IElevatorDTO>>('Error getting elevators');
//     //         sinon.stub(elevatorService, 'getElevators').resolves(expectedResult);

//     //         // Act
//     //         await elevatorController.getElevators(req, res, next);

//     //         // Assert
//     //         expect(res.status.calledOnce).to.be.true;
//     //         expect(res.status.calledWith(400)).to.be.true;
//     //         expect(res.status().send.calledOnce).to.be.true;
//     //         expect(res.status().send.calledWith({ error: expectedResult.errorValue() })).to.be.true;
//     //     });
//     // });

//     // describe('deleteElevator', () => {
//     //     it('should delete an elevator and return a success message', async () => {
//     //         // Arrange
//     //         const req = {
//     //             params: {
//     //                 id: 'elevator_id'
//     //             }
//     //         } as Request;
//     //         const res = {
//     //             status: sinon.stub().returns({
//     //                 send: sinon.spy()
//     //             })
//     //         } as unknown as Response;
//     //         const next = sinon.spy();
//     //         const expectedResult = Result.ok<void>();
//     //         sinon.stub(elevatorService, 'deleteElevator').resolves(expectedResult);

//     //         // Act
//     //         await elevatorController.deleteElevator(req, res, next);

//     //         // Assert
//     //         expect(res.status.calledOnce).to.be.true;
//     //         expect(res.status.calledWith(200)).to.be.true;
//     //         expect(res.status().send.calledOnce).to.be.true;
//     //         expect(res.status().send.calledWith({ Success: 'Elevator deleted successfully' })).to.be.true;
//     //     });

//     //     it('should return an error when the elevator does not exist', async () => {
//     //         // Arrange
//     //         const req = {
//     //             params: {
//     //                 id: 'elevator_id'
//     //             }
//     //         } as Request;
//     //         const res = {
//     //             status: sinon.stub().returns({
//     //                 send: sinon.spy()
//     //             })
//     //         } as unknown as Response;
//     //         const next = sinon.spy();
//     //         const expectedResult = Result.fail<void>('Elevator not found');
//     //         sinon.stub(elevatorService, 'deleteElevator').resolves(expectedResult);

//     //         // Act
//     //         await elevatorController.deleteElevator(req, res, next);

//     //         // Assert
//     //         expect(res.status.calledOnce).to.be.true;
//     //         expect(res.status.calledWith(404)).to.be.true;
//     //         expect(res.status().send.calledOnce).to.be.true;
//     //         expect(res.status().send.calledWith({ error: expectedResult.errorValue() })).to.be.true;
//     //     });
//     // });
// });
