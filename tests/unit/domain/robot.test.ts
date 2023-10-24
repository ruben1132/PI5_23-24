import { Robot } from "../../../src/domain/robot";
import { expect } from 'chai';
import { RobotState } from "../../../src/domain/valueObj/robotState";
import { RobotIdentification } from "../../../src/domain/valueObj/robotIdentification";
import { RobotNickname } from "../../../src/domain/valueObj/robotNickname";
import { RobotSerialNumber } from "../../../src/domain/valueObj/robotSerialNumber";
import { RobotDescription } from "../../../src/domain/valueObj/robotDescription";
import { RobotTypeId } from "../../../src/domain/valueObj/robotTypeId";

describe("Robot", () => {

    const identification = RobotIdentification.create("R001").getValue();
    const nickname = RobotNickname.create("Robot 1").getValue();
    const robotType = new RobotTypeId("type1");
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
        expect("type1").to.equal(robot.robotType.toString());
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