import { RobotType } from '../../../src/domain/robotType';
import { RobotTypeBrand } from '../../../src/domain/valueObj/robotTypeBrand';
import { RobotTypeModel } from '../../../src/domain/valueObj/robotTypeModel';
import { RobotTypeType } from '../../../src/domain/valueObj/robotTypeType';
import { TaskType } from '../../../src/domain/taskType';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { expect } from 'chai';
import { TaskTypeId } from '../../../src/domain/valueObj/taskTypeId';

describe('RobotType', () => {
    const taskType1 = new TaskTypeId("taskType1");

    const taskType2 =  new TaskTypeId("taskType2");

    const tasksAllowed = [taskType1, taskType2];

    const type = RobotTypeType.create('type').getValue();
    const brand = RobotTypeType.create('brand').getValue();
    const model = RobotTypeModel.create('model').getValue();

    describe('create', () => {
        it('should create a RobotType instance with valid arguments', () => {
            const robotTypeProps = {
                type: type,
                brand: brand,
                model: model,
                tasksAllowed: tasksAllowed,
            };
            const robotType = RobotType.create(robotTypeProps, new UniqueEntityID());

            expect(robotType.isSuccess).to.be.true;
            expect(robotType.getValue().type).to.equal(robotTypeProps.type);
            expect(robotType.getValue().brand).to.equal(robotTypeProps.brand);
            expect(robotType.getValue().model).to.equal(robotTypeProps.model);
            expect(robotType.getValue().tasksAllowed).to.equal(robotTypeProps.tasksAllowed);
        });

        it('should fail if no type', () => {
            const robotType = RobotType.create({
                type: null,
                brand: brand,
                model: model,
                tasksAllowed: tasksAllowed
            }, new UniqueEntityID());

            expect(robotType.isFailure).to.be.true;
            expect('type is null or undefined').to.equal(robotType.error);
        });

        it('should fail if no brand is provided', () => {
            const robotType = RobotType.create({
                type: type,
                brand: null,
                model: model,
                tasksAllowed: tasksAllowed
            }, new UniqueEntityID());

            expect(robotType.isFailure).to.be.true;
            expect('brand is null or undefined').to.equal(robotType.error);
        });

        it('should fail if no model is provided', () => {
            const robotType = RobotType.create({
                type: type,
                brand: brand,
                model: null,
                tasksAllowed: tasksAllowed
            }, new UniqueEntityID());

            expect(robotType.isFailure).to.be.true;
            expect('model is null or undefined').to.equal(robotType.error);
        });

        it('should fail if tasksAllowed is empty', () => {
            const robotType = RobotType.create({
                type: type,
                brand: brand,
                model: model,
                tasksAllowed: [],
            }, new UniqueEntityID());

            expect(robotType.isFailure).to.be.true;
            expect('tasksAllowed is empty').to.equal(robotType.error);
        });
    });
});