// import 'reflect-metadata';
// import * as sinon from 'sinon';
// import { Response, Request, NextFunction } from 'express';
// import { Result } from '../../../src/core/logic/Result';
// import FloorMapController from '../../../src/controllers/floorMapController';
// import IFloorMapDTO from '../../../src/dto/IFloorMapDTO';
// import FloorMapService from '../../../src/services/floorMapService';
// import FloorMapRepo from '../../../src/repos/floorMapRepo';
// import FloorRepo from '../../../src/repos/floorRepo';
// import RoomRepo from '../../../src/repos/roomRepo';
// import PassageRepo from '../../../src/repos/passageRepo';
// import ElevatorRepo from '../../../src/repos/elevatorRepo';
// import FloorMapSchema from '../../../src/persistence/schemas/floorMapSchema';
// import { SinonSpy } from 'sinon';
// import { Room } from '../../../src/domain/room';
// import { Elevator } from '../../../src/domain/elevator';

// describe('FloorMap Controller', function () {

//     let floorMapRepo: FloorMapRepo;
//     let roomrepo: RoomRepo;
//     let floorRepo: FloorRepo;
//     let elevatorRepo: ElevatorRepo;
//     let passageRepo: PassageRepo;
//     let service: FloorMapService;

//     beforeEach(function () {
//         floorMapRepo = new FloorMapRepo(FloorMapSchema);
//         service = new FloorMapService(floorMapRepo, floorRepo, roomrepo, elevatorRepo, passageRepo);
//     });

//     afterEach(function () {
//         sinon.restore();
//     });
//     it('floorMapController unit test using floorMapService stub', async function () {

//         // Arrange
//         const fileContent = {
//             "floor": "f3483019-0f1b-4283-aab1-e5338ec3a7b3",
//             "map": [
//                 [
//                     1,
//                     1,
//                     0
//                 ],
//                 [
//                     1,
//                     0,
//                     1
//                 ]
//             ],
//             "fmElevator": {
//                 "elevatorId": "089c4eff-652f-4b71-965a-a95ddb182e57",
//                 "positionX": 9,
//                 "positionY": 4,
//                 "direction": "norte"
//             },
//             "fmRooms": [
//                 {
//                     "roomId": "366aee22-6886-4165-b58b-d1b3730e7438",
//                     "startX": 0,
//                     "startY": 0,
//                     "endX": 4,
//                     "endY": 4
//                 },
//                 {
//                     "roomId": "5edcc425-5e60-4d50-bd5f-dc7403e51f1d",
//                     "startX": 4,
//                     "startY": 4,
//                     "endX": 6,
//                     "endY": 6
//                 }
//             ],
//             "fmPassages": [
//                 {
//                     "passageId": "7ee9a627-5bf3-4f0a-8f69-db4f276d998d",
//                     "positionX": 10,
//                     "positionY": 7,
//                     "direction": "oeste"
//                 }
//             ],
//             "fmDoors": [
//                 {
//                     "positionX": 4,
//                     "positionY": 4,
//                     "direction": "oeste"
//                 },
//                 {
//                     "positionX": 6,
//                     "positionY": 6,
//                     "direction": "norte"
//                 }
//             ]
//         }

//         const fileBuffer = Buffer.from(JSON.stringify(fileContent));
//         let req: Partial<Request & { file: any }> = {
//             file: {
//                 buffer: fileBuffer
//             }
//         };
//         let res: Partial<Response> = {
//             json: sinon.spy() as SinonSpy<[any?]>
//         };
//         let next: Partial<NextFunction> = () => { };

//         sinon.stub(service, "createFloorMap").resolves(Result.ok<IFloorMapDTO>(fileContent));

//         const ctrl = new FloorMapController(service);

//         // Act
//         await ctrl.createFloorMap(<Request & { file: any }>req, <Response>res, <NextFunction>next);

//         try {
//             // Assert
//             sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
//             sinon.assert.calledWith(res.json as SinonSpy<[any?]>, fileContent);

//         } catch (error) {
//             console.log(error);

//             throw error;
//         }

//         sinon.restore();

//     });
// });

