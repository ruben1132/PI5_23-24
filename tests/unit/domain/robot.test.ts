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
        name: "Task type1",
        description: "Task type1 Description",
    }).getValue();

    const taskType2 = TaskType.create({
        name: "Task Type 2",
        description: "Task Type 2 Description",
    }).getValue();

    const taskTypesAllowed = [taskType1, taskType2];

    const identification = RobotIdentification.create("R001").getValue();
    const nickname = RobotNickname.create("Robot 1").getValue();
    const robotType = RobotType.create({
        type: RobotTypeType.create("type1").getValue(),
        brand: RobotTypeBrand.create("Brand 1").getValue(),
        model: RobotTypeModel.create("Model 1").getValue(),
        tasksAllowed: taskTypesAllowed,
    }).getValue();
    const serialNumber = RobotSerialNumber.create("123").getValue();
    const description = RobotDescription.create("Robot 1").getValue();
    const state = RobotState.create(true).getValue();

    it("should create a robot with the correct properties", () => {

        const robot = Robot.create(
            {
                identification: identification,
                nickname: nickname,
                robotType: robotType,
                serialNumber: serialNumber,
                description: description,
                state: state,
            },

        ).getValue();

        expect("R001").to.equal(robot.identification.value);
        expect("Robot 1").to.equal(robot.nickname.value);
        expect("type1").to.equal(robot.robotType.type.value);
        expect("Brand 1").to.equal(robot.robotType.brand.value);
        expect("Model 1").to.equal(robot.robotType.model.value);
        expect("123").to.equal(robot.serialNumber.value);
        expect("Robot 1").to.equal(robot.description.value);
        expect(true).to.equal(robot.state.value);
    });

    it("should fail if no description is provided", () => {
        const robotOrError = Robot.create({ 
            identification: identification,
            nickname: nickname,
            robotType: robotType,
            serialNumber: serialNumber,
            description: null,
            state: state,
        });

        expect(robotOrError.isFailure).to.be.true;
        expect("description is null or undefined").to.equal(robotOrError.errorValue());
    });

    it("should fail if no state is provided", () => {
        const robotOrError = Robot.create({ 
            identification: identification,
            nickname: nickname,
            robotType: robotType,
            serialNumber: serialNumber,
            description: description,
            state: null,
        });

        expect(robotOrError.isFailure).to.be.true;
        expect("state is null or undefined").to.equal(robotOrError.errorValue());
    });

    it("should fail if no nickname is provided", () => {
        const robotOrError = Robot.create({ 
            identification: identification,
            nickname: null,
            robotType: robotType,
            serialNumber: serialNumber,
            description: description,
            state: state,
        });

        expect(robotOrError.isFailure).to.be.true;
        expect("nickname is null or undefined").to.equal(robotOrError.errorValue());
    });

    it("should fail if no identification is provided", () => {
        const robotOrError = Robot.create({ 
            identification: null,
            nickname: nickname,
            robotType: robotType,
            serialNumber: serialNumber,
            description: description,
            state: state,
        });

        expect(robotOrError.isFailure).to.be.true;
        expect("identification is null or undefined").to.equal(robotOrError.errorValue());
    });

    it("should fail if no robotType is provided", () => {
        const robotOrError = Robot.create({ 
            identification: identification,
            nickname: nickname,
            robotType: null,
            serialNumber: serialNumber,
            description: description,
            state: state,
        });

        expect(robotOrError.isFailure).to.be.true;
        expect("robotType is null or undefined").to.equal(robotOrError.errorValue());
    });

    it("should fail if no serialNumber is provided", () => {
        const robotOrError = Robot.create({ 
            identification: identification,
            nickname: nickname,
            robotType: robotType,
            serialNumber: null,
            description: description,
            state: state,
        });

        expect(robotOrError.isFailure).to.be.true;
        expect("serialNumber is null or undefined").to.equal(robotOrError.errorValue());
    });

    it("should fail if no robotType is provided", () => {
        const robotOrError = Robot.create({ 
            identification: identification,
            nickname: nickname,
            robotType: robotType,
            serialNumber: serialNumber,
            description: description,
            state: null,
        });

        expect(robotOrError.isFailure).to.be.true;
        expect("state is null or undefined").to.equal(robotOrError.errorValue());
    });

});