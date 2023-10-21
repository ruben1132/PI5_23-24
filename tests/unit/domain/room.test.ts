import { Room } from "../../../src/domain/room";
import { RoomNumber } from "../../../src/domain/valueObj/roomNumber";
import { Floor } from "../../../src/domain/floor";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { Building } from "../../../src/domain/building";
import { BuildingCode } from "../../../src/domain/valueObj/buildingCode";
import { BuildingName } from "../../../src/domain/valueObj/buildingName";
import { BuildingDimensions } from "../../../src/domain/valueObj/buildingDimensions";
import { FloorNumber } from "../../../src/domain/valueObj/floorNumber";
import { FloorInformation } from "../../../src/domain/valueObj/floorInformation";
import { expect } from 'chai';

describe('Room', () => {

    const building = Building.create({
        code: BuildingCode.create("B001").getValue(),
        name: BuildingName.create("Building 1").getValue(),
        dimensions: BuildingDimensions.create("10x8").getValue(),
    }, new UniqueEntityID("test-id")).getValue();

    const floor = Floor.create({
        number: 2,
        information: FloorInformation.create('Floor 2').getValue(),
        building: building
    }).getValue();

    describe('create', () => {
        it('should fail if no room number is provided', () => {
            const roomOrError = Room.create({
                number: null,
                floor: floor
            });

            expect(roomOrError.isFailure).to.be.true;
            expect('number is null or undefined').to.be.equal(roomOrError.errorValue());
        });

        it('should fail if room number doesnt match the regex', () => {
            const roomNumOrError = RoomNumber.create("SA34292");

            expect(roomNumOrError.isFailure).to.be.true;
            expect('Room number must be in the format A001').to.be.equal(roomNumOrError.errorValue());
        });

        it('should fail if no floor is provided', () => {
            const roomOrError = Room.create({
                number: RoomNumber.create("A001").getValue(),
                floor: null
            });

            expect(roomOrError.isFailure).to.be.true;
            expect('floor is null or undefined').to.be.equal(roomOrError.errorValue());
        });

        it('should create a room with valid data', () => {
            const roomOrError = Room.create({
                number: RoomNumber.create("A001").getValue(),
                floor: floor
            });

            expect(roomOrError.isSuccess).to.be.true;
            const room = roomOrError.getValue();
            expect("A001").to.be.equal(room.number.value);
            expect(floor).to.be.equal(room.floor);
        });

    });

});