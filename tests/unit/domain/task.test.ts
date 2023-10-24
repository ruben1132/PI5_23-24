import { Task } from "../../../src/domain/task";
import { expect } from 'chai';

import { RobotId } from "../../../src/domain/valueObj/robotId";
import { TaskTypeId } from "../../../src/domain/valueObj/taskTypeId";

describe("Task", () => {

    const taskType1 = new TaskTypeId("type1");
    
    const robot = new RobotId("robot1");

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