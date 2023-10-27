import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { Result } from '../core/logic/Result';
import { RobotTypeBrand } from './valueObj/robotTypeBrand';
import { RobotTypeModel } from './valueObj/robotTypeModel';
import { RobotTypeType } from './valueObj/robotTypeType';

import { RobotTypeId } from './valueObj/robotTypeId';
import { TaskType } from './taskType';
import { Guard } from '../core/logic/Guard';
import { TaskTypeId } from './valueObj/taskTypeId';

interface RobotTypeProps {
    type: RobotTypeType;
    brand: RobotTypeBrand;
    model: RobotTypeModel;
    tasksAllowed: TaskTypeId[];   
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): RobotTypeId {
        return new RobotTypeId(this.id.toValue());
    }

    get type(): RobotTypeType {
        return this.props.type;
    }

    set type(value: RobotTypeType) {
        this.props.type = value;
    }

    get brand(): RobotTypeBrand {
        return this.props.brand;
    }

    set brand(value: RobotTypeBrand) {
        this.props.brand = value;
    }

    get model(): RobotTypeModel {
        return this.props.model;
    }

    set model(value: RobotTypeModel) {
        this.props.model = value;
    }

    get tasksAllowed(): TaskTypeId[] {
        return this.props.tasksAllowed;
    }

    set tasksAllowed(value: TaskTypeId[]) {
        this.props.tasksAllowed = value;
    }

    private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {
        const guardedProps = [
            { argument: props.type, argumentName: 'type' },
            { argument: props.brand, argumentName: 'brand' },
            { argument: props.model, argumentName: 'model' },
            { argument: props.tasksAllowed, argumentName: 'tasksAllowed' },
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<RobotType>(guardResult.message)
        }

        if (props.tasksAllowed.length === 0) {
            return Result.fail<RobotType>("tasksAllowed is empty")
        }

        const robotType = new RobotType(
            { type: props.type, brand: props.brand, model: props.model, tasksAllowed: props.tasksAllowed },
            id,
        );

        return Result.ok<RobotType>(robotType);

    }
}
