// import { FloorMap } from '../../../src/domain/floorMap';
// import { Floor } from '../../../src/domain/floor';
// import { FloorMapDoor } from '../../../src/domain/valueObj/floorMapDoor';
// import { FloorMapElevator } from '../../../src/domain/valueObj/floorMapElevator';
// import { FloorMapPassage } from '../../../src/domain/valueObj/floorMapPassage';
// import { FloorMapRoom } from '../../../src/domain/valueObj/floorMapRoom';
// import { FloorInformation } from '../../../src/domain/valueObj/floorInformation';
// import { FloorMapPosition } from '../../../src/domain/valueObj/floorMapPosition';
// import { FloorMapDirection } from '../../../src/domain/valueObj/floorMapDirection';
// import { FloorMapDimensions } from '../../../src/domain/valueObj/floorMapDimensions';
// import { Elevator } from '../../../src/domain/elevator';
// import { ElevatorDesignation } from '../../../src/domain/valueObj/elevatorDesignation';
// import { Passage } from '../../../src/domain/passage';
// import { expect } from 'chai';
// import { FloorId } from '../../../src/domain/valueObj/floorId';
// import { RoomId } from '../../../src/domain/valueObj/roomId';
// import { ElevatorId } from '../../../src/domain/valueObj/elevatorId';
// import { PassageId } from '../../../src/domain/valueObj/passageId';

// describe('FloorMap', () => {

//     const floor1 = new FloorId("floor1");

//     const floor2 = new FloorId("floor2");

//     const room1 = new RoomId("room1");

//     const room2 = new RoomId("room2");

//     const floorMapPosition = FloorMapPosition.create({
//         posX: 0,
//         posY: 0,
//         direction: FloorMapDirection.create('norte').getValue(),
//     }).getValue()

//     const map = [[0, 1, 0], [1, 0, 1]];

//     const fmRoom1 = FloorMapRoom.create({
//         room: room1,
//         dimensions: FloorMapDimensions.create({
//             startX: 1,
//             startY: 1,
//             endX: 1,
//             endY: 1,
//         }).getValue()
//     }).getValue();

//     const fmRoom2 = FloorMapRoom.create({
//         room: room2,
//         dimensions: FloorMapDimensions.create({
//             startX: 1,
//             startY: 1,
//             endX: 1,
//             endY: 1,
//         }).getValue()
//     }).getValue();

//     const fmRoomsV = [fmRoom1, fmRoom2];

//     const door1 = FloorMapDoor.create({
//         position: floorMapPosition,
//     }).getValue();

//     const door2 = FloorMapDoor.create({
//         position: floorMapPosition,
//     }).getValue();

//     const elevator = new ElevatorId("elevator1");

//     const fmElevator = FloorMapElevator.create({
//         elevator: elevator,
//         position: floorMapPosition,
//     }).getValue();

//     const fmDoorsV = [door1, door2];
//     const fmElevatorV = FloorMapElevator.create({
//         elevator: elevator,
//         position: floorMapPosition,
//     }).getValue();

//     const fmPassage = FloorMapPassage.create({
//         passage: new PassageId("passage1"),
//         position: floorMapPosition,
//     }).getValue();

//     const fmPassagesV = [fmPassage];

//     describe('create', () => {
//         it('should create a new FloorMap instance', () => {
//             const floorMapResult = FloorMap.create({
//                 floor: floor1,
//                 map: map,
//                 fmRooms: fmRoomsV,
//                 fmDoors: fmDoorsV,
//                 fmElevator: fmElevatorV,
//                 fmPassages: fmPassagesV,
//             });

//             expect(floorMapResult.isSuccess).to.be.true;
//             expect(floorMapResult.getValue()).to.be.instanceOf(FloorMap);
//             expect(floor1).to.equal(floorMapResult.getValue().floor);
//             expect(floorMapResult.getValue().map).to.equal(map);
//             expect(fmRoomsV).to.equal(floorMapResult.getValue().fmRooms);
//             expect(fmDoorsV).to.equal(floorMapResult.getValue().fmDoors);
//             expect(fmElevatorV).to.equal(floorMapResult.getValue().fmElevator);
//             expect(fmPassagesV).to.equal(floorMapResult.getValue().fmPassages);
//         });

//         it('should fail if floor is missing', () => {
//             const floorMapResult = FloorMap.create({
//                 floor: null,
//                 map: map,
//                 fmRooms: fmRoomsV,
//                 fmDoors: fmDoorsV,
//                 fmElevator: fmElevatorV,
//                 fmPassages: fmPassagesV,
//             });

//             expect(floorMapResult.isFailure).to.be.true;
//             expect('floor is null or undefined').to.equal(floorMapResult.errorValue());
//         });

//         it('should fail if map is empty', () => {
//             const floorMapResult = FloorMap.create({
//                 floor: floor1,
//                 map: [],
//                 fmRooms: fmRoomsV,
//                 fmDoors: fmDoorsV,
//                 fmElevator: fmElevatorV,
//                 fmPassages: fmPassagesV,
//             });

//             expect(floorMapResult.isFailure).to.be.true;
//             expect('Map is empty').to.equal(floorMapResult.errorValue());
//         });

//         it('should fail if fmRooms is empty', () => {
//             const floorMapResult = FloorMap.create({
//                 floor: floor1,
//                 map: map,
//                 fmRooms: null,
//                 fmDoors: fmDoorsV,
//                 fmElevator: fmElevatorV,
//                 fmPassages: fmPassagesV,
//             });

//             expect(floorMapResult.isFailure).to.be.true;
//             expect('fmRooms is null or undefined').to.equal(floorMapResult.errorValue());
//         });

//         it('should fail if fmDoors is empty', () => {
//             const floorMapResult = FloorMap.create({
//                 floor: floor1,
//                 map: map,
//                 fmRooms: fmRoomsV,
//                 fmDoors: null,
//                 fmElevator: fmElevatorV,
//                 fmPassages: fmPassagesV,
//             });

//             expect(floorMapResult.isFailure).to.be.true;
//             expect('fmDoors is null or undefined').to.equal(floorMapResult.errorValue());
//         });

//         it('should fail if fmElevator is empty', () => {
//             const floorMapResult = FloorMap.create({
//                 floor: floor1,
//                 map: map,
//                 fmRooms: fmRoomsV,
//                 fmDoors: fmDoorsV,
//                 fmElevator: null,
//                 fmPassages: fmPassagesV,
//             });

//             expect(floorMapResult.isFailure).to.be.true;
//             expect('fmElevator is null or undefined').to.equal(floorMapResult.errorValue());
//         });

//         it('should fail if fmPassages is empty', () => {
//             const floorMapResult = FloorMap.create({
//                 floor: floor1,
//                 map: map,
//                 fmRooms: fmRoomsV,
//                 fmDoors: fmDoorsV,
//                 fmElevator: fmElevatorV,
//                 fmPassages: null,
//             });

//             expect(floorMapResult.isFailure).to.be.true;
//             expect('fmPassages is null or undefined').to.equal(floorMapResult.errorValue());
//         });
//     });

// });
