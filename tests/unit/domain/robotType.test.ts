import { RobotType } from '../../../src/domain/robotType';
import { RobotTypeBrand } from '../../../src/domain/valueObj/robotTypeBrand';
import { RobotTypeModel } from '../../../src/domain/valueObj/robotTypeModel';
import { RobotTypeType } from '../../../src/domain/valueObj/robotTypeType';
import { TaskType } from '../../../src/domain/taskType';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { expect } from 'chai';

describe('RobotType', () => {
    const taskType1 = TaskType.create({
        name: "Task Type 1",
        description: "Task Type 1 Description",
    }).getValue();

    const taskType2 = TaskType.create({
        name: "Task Type 2",
        description: "Task Type 2 Description",
    }).getValue();

    const tasksAvailable = [taskType1, taskType2];

    const type = RobotTypeType.create('type').getValue();
    const brand = RobotTypeType.create('brand').getValue();
    const model = RobotTypeModel.create('model').getValue();

    describe('create', () => {
        it('should create a RobotType instance with valid arguments', () => {
            const robotTypeProps = {
                type: type,
                brand: brand,
                model: model,
                tasksAvailable: tasksAvailable,
            };
            const robotType = RobotType.create(robotTypeProps, new UniqueEntityID());

            expect(robotType.isSuccess).to.be.true;
            expect(robotType.getValue().type).to.equal(robotTypeProps.type);
            expect(robotType.getValue().brand).to.equal(robotTypeProps.brand);
            expect(robotType.getValue().model).to.equal(robotTypeProps.model);
            expect(robotType.getValue().tasksAvailable).to.equal(robotTypeProps.tasksAvailable);
        });

        it('should fail if no type', () => {
            const robotType = RobotType.create({
                type: null,
                brand: brand,
                model: model,
                tasksAvailable: tasksAvailable
            }, new UniqueEntityID());

            expect(robotType.isFailure).to.be.true;
            expect(robotType.error).to.equal('type is null or undefined');
        });

        it('should fail if no brand is provided', () => {
            const robotType = RobotType.create({
                type: type,
                brand: null,
                model: model,
                tasksAvailable: tasksAvailable
            }, new UniqueEntityID());

            expect(robotType.isFailure).to.be.true;
            expect(robotType.error).to.equal('brand is null or undefined');
        });

        it('should fail if no model is provided', () => {
            const robotType = RobotType.create({
                type: type,
                brand: brand,
                model: null,
                tasksAvailable: tasksAvailable
            }, new UniqueEntityID());

            expect(robotType.isFailure).to.be.true;
            expect(robotType.error).to.equal('model is null or undefined');
        });

        it('should fail if tasksAvailable is empty', () => {
            const robotType = RobotType.create({
                type: type,
                brand: brand,
                model: model,
                tasksAvailable: [],
            }, new UniqueEntityID());

            expect(robotType.isFailure).to.be.true;
            expect(robotType.error).to.equal('tasksAvailable is empty');
        });
    });
});