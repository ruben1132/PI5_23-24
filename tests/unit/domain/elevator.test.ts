import { Elevator } from "../../../src/domain/elevator";
import { ElevatorDesignation } from "../../../src/domain/valueObj/elevatorDesignation";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { expect } from 'chai';
import { FloorId } from "../../../src/domain/valueObj/floorId";

describe("Elevator", () => {
    const validElevatorDesignation = ElevatorDesignation.create("Elevator 1").getValue();
    const validFloor = new FloorId("floorid1")
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

