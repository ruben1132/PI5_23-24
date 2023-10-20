import { Elevator } from "../../../src/domain/elevator";
import { ElevatorDesignation } from "../../../src/domain/valueObj/elevatorDesignation";
import { Floor } from "../../../src/domain/floor";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { FloorNumber } from "../../../src/domain/valueObj/floorNumber";
import { FloorInformation } from "../../../src/domain/valueObj/floorInformation";
import { Building } from "../../../src/domain/building";
import { BuildingCode } from "../../../src/domain/valueObj/buildingCode";
import { BuildingName } from "../../../src/domain/valueObj/buildingName";
import { BuildingDimensions } from "../../../src/domain/valueObj/buildingDimensions";
import { expect } from 'chai';

describe("Elevator", () => {
    const validElevatorDesignation = ElevatorDesignation.create("Elevator 1").getValue();
    const validFloor = Floor.create({
        number: FloorNumber.create(0).getValue(),
        information: FloorInformation.create("Floor 0").getValue(),
        building: Building.create({
            code: BuildingCode.create("B001").getValue(),
            name: BuildingName.create("Building 1").getValue(),
            dimensions: BuildingDimensions.create("10x8").getValue(),
        }, new UniqueEntityID("test-id")).getValue(),
    }).getValue();

    const invalidFloor = null;

    const validFloorsAllowed = [validFloor];

    describe("create", () => {
        it("should create a valid elevator", () => {
            const elevatorOrError = Elevator.create({
                designation: validElevatorDesignation,
                floorsAllowed: validFloorsAllowed,
            });

            expect(elevatorOrError.isSuccess).to.be.true;
            const elevator = elevatorOrError.getValue();

            expect(validElevatorDesignation ).to.equal(elevator.elevatorDesignation);
            expect(validFloorsAllowed).to.equal(elevator.floorsAllowed);
        });

        it("should fail, elevator designation invalid", () => {
            const elevatorOrError = Elevator.create({
                designation: null,
                floorsAllowed: validFloorsAllowed,
            });

            expect(elevatorOrError.isFailure).to.be.true;
            expect("designation is null or undefined").to.equal(elevatorOrError.errorValue());
        });

        it("should fail, elevator floors allowed empty", () => {
            const elevatorOrError = Elevator.create({
                designation: validElevatorDesignation,
                floorsAllowed: [],
            });

            expect("Must provide floors").to.equal(elevatorOrError.errorValue());
            expect(elevatorOrError.isFailure).to.be.true;
        });
    });

    describe("getters", () => {
        it("should return the correct values", () => {
            const elevator = Elevator.create(
                {
                    designation: validElevatorDesignation,
                    floorsAllowed: validFloorsAllowed,
                },
                new UniqueEntityID("test-id")
            );

            expect(validElevatorDesignation).to.equal(elevator.getValue().elevatorDesignation);
            expect(validFloorsAllowed).to.equal(elevator.getValue().floorsAllowed);
        });
    });
});

