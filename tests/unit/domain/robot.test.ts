import { Robot } from "../../../src/domain/robot";
import { TaskType } from "../../../src/domain/taskType";
import { expect } from 'chai';
import { RobotState } from "../../../src/domain/valueObj/robotState";
import { RobotIdentification } from "../../../src/domain/valueObj/robotIdentification";
import { RobotNickname } from "../../../src/domain/valueObj/robotNickname";
import { RobotType } from "../../../src/domain/robotType";
import { RobotSerialNumber } from "../../../src/domain/valueObj/robotSerialNumber";
import { RobotDescription } from "../../../src/domain/valueObj/robotDescription";
import { RobotTypeType } from "../../../src/domain/valueObj/robotTypeType";
import { RobotTypeBrand } from "../../../src/domain/valueObj/robotTypeBrand";
import { RobotTypeModel } from "../../../src/domain/valueObj/robotTypeModel";

describe("Robot", () => {
    const taskType1 = TaskType.create({
        name: "Task Type 1",
        description: "Task Type 1 Description",
    }).getValue();

    const taskType2 = TaskType.create({
        name: "Task Type 2",
        description: "Task Type 2 Description",
    }).getValue();

    const taskTypesAllowed = [taskType1, taskType2];

    it("should create a robot with the correct properties", () => {

        const robotOrError = Robot.create({
            identification: RobotIdentification.create("Robot 1").getValue(),
            nickname: RobotNickname.create("Robot 1").getValue(),
            robotType: RobotType.create({
                type: RobotTypeType.create("Type 1").getValue(),
                brand: RobotTypeBrand.create("Brand 1").getValue(),
                model: RobotTypeModel.create("Model 1").getValue(),
                tasksAllowed: taskTypesAllowed,
            }).getValue(),
            serialNumber: RobotSerialNumber.create("Robot 1").getValue(),
            description: RobotDescription.create("Robot 1").getValue(),
            state: RobotState.create(true).getValue(),
            
        });
        const robot = robotOrError.getValue();

        expect(robotOrError.isSuccess).to.be.true;
        expect("Robot 1").to.equal(robot.designation);
        expect(robot.state).to.be.true;
        expect(taskTypesAllowed).to.equal(robot.taskTypesAllowed);
    });

    it("should fail if no designation is provided", () => {
        const robotOrError = Robot.create({ state: true, taskTypesAllowed: taskTypesAllowed, designation: null });

        expect(robotOrError.isFailure).to.be.true;
        expect("designation is null or undefined").to.equal(robotOrError.errorValue());
    });

    it("should fail if no state is provided", () => {
        const robotOrError = Robot.create({ state: null, taskTypesAllowed: taskTypesAllowed, designation: "Robot 1" });

        expect(robotOrError.isFailure).to.be.true;
        expect("state is null or undefined").to.equal(robotOrError.errorValue());
    });

    it("should fail if no taskTypesAllowed is provided", () => {
        const robotOrError = Robot.create({ state: true, taskTypesAllowed: null, designation: "Robot 1" });

        expect(robotOrError.isFailure).to.be.true;
        expect("taskTypesAllowed is null or undefined").to.equal(robotOrError.errorValue());
    });
});