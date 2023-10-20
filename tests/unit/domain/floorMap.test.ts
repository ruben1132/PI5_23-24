import { FloorMap } from '../../../src/domain/floorMap';
import { Floor } from '../../../src/domain/floor';
import { FloorMapId } from '../../../src/domain/valueObj/floorMapId';
import { FloorMapDoor } from '../../../src/domain/valueObj/floorMapDoor';
import { FloorMapElevator } from '../../../src/domain/valueObj/floorMapElevator';
import { FloorMapPassage } from '../../../src/domain/valueObj/floorMapPassage';
import { FloorMapRoom } from '../../../src/domain/valueObj/floorMapRoom';
import { Building } from '../../../src/domain/building';
import { BuildingCode } from '../../../src/domain/valueObj/buildingCode';
import { BuildingName } from '../../../src/domain/valueObj/buildingName';
import { BuildingDimensions } from '../../../src/domain/valueObj/buildingDimensions';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { FloorNumber } from '../../../src/domain/valueObj/floorNumber';
import { FloorInformation } from '../../../src/domain/valueObj/floorInformation';
import { Room } from '../../../src/domain/room';
import { FloorMapPosition } from '../../../src/domain/valueObj/floorMapPosition';
import { FloorMapDirection } from '../../../src/domain/valueObj/floorMapDirection';
import { FloorMapDimensions } from '../../../src/domain/valueObj/floorMapDimensions';
import { Elevator } from '../../../src/domain/elevator';
import { ElevatorDesignation } from '../../../src/domain/valueObj/elevatorDesignation';
import { Passage } from '../../../src/domain/passage';
import { expect } from 'chai';
import { RoomNumber } from '../../../src/domain/valueObj/roomNumber';

describe('FloorMap', () => {
    const building1 = Building.create({
        code: BuildingCode.create("B001").getValue(),
        name: BuildingName.create("Building 1").getValue(),
        dimensions: BuildingDimensions.create("10x8").getValue(),
    }, new UniqueEntityID("test-id")).getValue();

    const building2 = Building.create({
        code: BuildingCode.create("B001").getValue(),
        name: BuildingName.create("Building 1").getValue(),
        dimensions: BuildingDimensions.create("10x8").getValue(),
    }, new UniqueEntityID("test-id")).getValue();

    const floor1 = Floor.create({
        number: FloorNumber.create(2).getValue(),
        information: FloorInformation.create('Floor 2').getValue(),
        building: building1
    }).getValue();

    const floor2 = Floor.create({
        number: FloorNumber.create(2).getValue(),
        information: FloorInformation.create('Floor 2').getValue(),
        building: building2
    }).getValue();

    const room1 = Room.create({
        number: RoomNumber.create("A001").getValue(),
        floor: floor1,
    }).getValue();

    const room2 = Room.create({
        number: RoomNumber.create("A001").getValue(),
        floor: floor1,
    }).getValue();

    const floorMapPosition = FloorMapPosition.create({
        posX: 0,
        posY: 0,
        direction: FloorMapDirection.create('norte').getValue(),
    }).getValue()

    const map = [[0, 1, 0], [1, 0, 1]];

    const fmRoom1 = FloorMapRoom.create({
        room: room1,
        pos: floorMapPosition,
        dimensions: FloorMapDimensions.create({
            startX: 1,
            startY: 1,
            endX: 1,
            endY: 1,
        }).getValue()
    }).getValue();

    const fmRoom2 = FloorMapRoom.create({
        room: room2,
        pos: FloorMapPosition.create({
            posX: 0,
            posY: 0,
            direction: FloorMapDirection.create('norte').getValue(),
        }).getValue(),
        dimensions: FloorMapDimensions.create({
            startX: 1,
            startY: 1,
            endX: 1,
            endY: 1,
        }).getValue()
    }).getValue();

    const fmRoomsV = [fmRoom1, fmRoom2];

    const door1 = FloorMapDoor.create({
        position: floorMapPosition,
    }).getValue();

    const door2 = FloorMapDoor.create({
        position: floorMapPosition,
    }).getValue();

    const elevator = Elevator.create({
        designation: ElevatorDesignation.create('elevator1').getValue(),
        floorsAllowed: [floor1],
    }).getValue();

    const fmElevator = FloorMapElevator.create({
        elevator: elevator,
        position: floorMapPosition,
    }).getValue();

    const fmDoorsV = [door1, door2];
    const fmElevatorV = FloorMapElevator.create({
        elevator: elevator,
        position: floorMapPosition,
    }).getValue();

    const fmPassage = FloorMapPassage.create({
        passage: Passage.create({
            designation: 'passage1',
            fromFloor: floor1,
            toFloor: floor2,
        }).getValue(),
        position: floorMapPosition,
    }).getValue();

    const fmPassagesV = [fmPassage];

    describe('create', () => {
        it('should create a new FloorMap instance', () => {
            const floorMapResult = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            });

            expect(floorMapResult.isSuccess).to.be.true;
            expect(floorMapResult.getValue()).to.be.instanceOf(FloorMap);
            expect(floor1).to.equal(floorMapResult.getValue().floor);
            expect(floorMapResult.getValue().map).to.equal(map);
            expect(fmRoomsV).to.equal(floorMapResult.getValue().fmRooms);
            expect(fmDoorsV).to.equal(floorMapResult.getValue().fmDoors);
            expect(fmElevatorV).to.equal(floorMapResult.getValue().fmElevator);
            expect(fmPassagesV).to.equal(floorMapResult.getValue().fmPassages);
        });

        it('should fail if floor is missing', () => {
            const floorMapResult = FloorMap.create({
                floor: null,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            });

            expect(floorMapResult.isFailure).to.be.true;
            expect('floor is null or undefined').to.equal(floorMapResult.errorValue());
        });

        it('should fail if map is empty', () => {
            const floorMapResult = FloorMap.create({
                floor: floor1,
                map: [],
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            });

            expect(floorMapResult.isFailure).to.be.true;
            expect('Map is empty').to.equal(floorMapResult.errorValue());
        });

        it('should fail if fmRooms is empty', () => {
            const floorMapResult = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: null,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            });

            expect(floorMapResult.isFailure).to.be.true;
            expect('fmRooms is null or undefined').to.equal(floorMapResult.errorValue());
        });

        it('should fail if fmDoors is empty', () => {
            const floorMapResult = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: null,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            });

            expect(floorMapResult.isFailure).to.be.true;
            expect('fmDoors is null or undefined').to.equal(floorMapResult.errorValue());
        });

        it('should fail if fmElevator is empty', () => {
            const floorMapResult = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: null,
                fmPassages: fmPassagesV,
            });

            expect(floorMapResult.isFailure).to.be.true;
            expect('fmElevator is null or undefined').to.equal(floorMapResult.errorValue());
        });

        it('should fail if fmPassages is empty', () => {
            const floorMapResult = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: null,
            });

            expect(floorMapResult.isFailure).to.be.true;
            expect('fmPassages is null or undefined').to.equal(floorMapResult.errorValue());
        });
    });

    describe('floor', () => {
        it('should set and get the floor', () => {
            const floorMap = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            }).getValue();

            const newFloor = Floor.create({
                number: FloorNumber.create(3).getValue(),
                information: FloorInformation.create('Floor 3').getValue(),
                building: building1
            }).getValue();
            floorMap.floor = newFloor;

            expect(newFloor).to.equal(floorMap.floor);
        });
    });

    describe('map', () => {
        it('should set and get the map', () => {
            const floorMap = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            }).getValue();

            const newMap = [[0, 1], [1, 0]];
            floorMap.map = newMap;

            expect(floorMap.map).to.equal(newMap);
        });
    });

    describe('fmRooms', () => {
        it('should set and get the floor map rooms', () => {
            const floorMap = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            }).getValue();

            const newFmRooms = [fmRoom1];
            floorMap.fmRooms = newFmRooms;

            expect(newFmRooms).to.equal(floorMap.fmRooms);
        });
    });

    describe('fmDoors', () => {
        it('should set and get the floor map doors', () => {
            const floorMap = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            }).getValue();

            const newFmDoors = [door2];
            floorMap.fmDoors = newFmDoors;

            expect(floorMap.fmDoors).to.equal(newFmDoors);
        });
    });

    describe('fmElevator', () => {
        it('should set and get the floor map elevator', () => {
            const floorMap = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            }).getValue();


            const newFmElevator = FloorMapElevator.create({
                elevator: elevator,
                position: FloorMapPosition.create({
                    posX: 0,
                    posY: 0,
                    direction: FloorMapDirection.create('oeste').getValue(),
                }).getValue(),
            }).getValue();

            floorMap.fmElevator = newFmElevator;

            expect(newFmElevator).to.equal(floorMap.fmElevator);
        });
    });

    describe('fmPassages', () => {
        it('should set and get the floor map passages', () => {
            const floorMap = FloorMap.create({
                floor: floor1,
                map: map,
                fmRooms: fmRoomsV,
                fmDoors: fmDoorsV,
                fmElevator: fmElevatorV,
                fmPassages: fmPassagesV,
            }).getValue();

            const newFmPassages = [ FloorMapPassage.create({
                passage: Passage.create({
                    designation: 'passage2',
                    fromFloor: floor2,
                    toFloor: floor1,
                }).getValue(),
                position: floorMapPosition,
            }).getValue()];
            floorMap.fmPassages = newFmPassages;

            expect(floorMap.fmPassages).to.equal(newFmPassages);
        });
    });
});