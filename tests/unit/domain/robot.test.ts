import { Robot } from "../../../src/domain/robot";
import { TaskType } from "../../../src/domain/taskType";
import { expect } from 'chai';

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
            state: true,
            designation: "Robot 1",
            taskTypesAllowed: taskTypesAllowed,
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
        expect(robotOrError.errorValue()).to.equal("designation is null or undefined");
    });

    it("should fail if no state is provided", () => {
        const robotOrError = Robot.create({ state: null, taskTypesAllowed: taskTypesAllowed, designation: "Robot 1" });

        expect(robotOrError.isFailure).to.be.true;
        expect(robotOrError.errorValue()).to.equal("state is null or undefined");
    });

    it("should fail if no taskTypesAllowed is provided", () => {
        const robotOrError = Robot.create({ state: true, taskTypesAllowed: null, designation: "Robot 1" });

        expect(robotOrError.isFailure).to.be.true;
        expect(robotOrError.errorValue()).to.equal("taskTypesAllowed is null or undefined");
    });
});