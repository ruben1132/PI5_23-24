import { Task } from "../../../src/domain/task";
import { TaskType } from "../../../src/domain/taskType";
import { Robot } from "../../../src/domain/robot";
import { expect } from 'chai';

describe("Task", () => {

    const taskType1 = TaskType.create({
        name: "Task Type 1",
        description: "Task Type 1 Description",
    }).getValue();

    const taskType2 = TaskType.create({
        name: "Task Type 2",
        description: "Task Type 2 Description",
    }).getValue();

    const taskTypesAllowed = [taskType1, taskType2];
    
    const robot = Robot.create({
        state: true,
        designation: "Robot 1",
        taskTypesAllowed: taskTypesAllowed,
    }).getValue();

    it("should create a task", () => {
        const taskProps = {
            designation: "Task 1",
            type: taskType1,
            assigned: robot,
        };
        const task = Task.create(taskProps);

        expect(task.isSuccess).to.be.true;
        expect("Task 1").to.be.equal(task.getValue().designation);
        expect(taskType1).to.be.equal(task.getValue().type);
        expect(robot).to.be.equal(task.getValue().assigned);
    });

    it("should fail if no designation is provided", () => {
        const task = Task.create({
            designation: null,
            type: taskType1,
            assigned: robot,
        });

        expect(task.isFailure).to.be.true;
        expect("designation is null or undefined").to.be.equal(task.errorValue());
    });

    it("should fail if no type is provided", () => {
        const task = Task.create({
            designation: "Task 1",
            type: null,
            assigned: robot,
        });

        expect(task.isFailure).to.be.true;
        expect("type is null or undefined").to.be.equal(task.errorValue());
    });

    it("should fail if no assigned is provided", () => {
        const task = Task.create({
            designation: "Task 1",
            type: taskType1,
            assigned: null,
        });

        expect(task.isFailure).to.be.true;
        expect("assigned is null or undefined").to.be.equal(task.errorValue());
    });

});