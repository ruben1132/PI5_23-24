import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { Result } from '../core/logic/Result';
import { RobotTypeBrand } from './valueObj/robotTypeBrand';
import { RobotTypeModel } from './valueObj/robotTypeModel';
import { RobotTypeType } from './valueObj/robotTypeType';

import { RobotTypeId } from './valueObj/robotTypeId';
import { TaskType } from './taskType';

interface RobotTypeProps {
    type: RobotTypeType;
    brand: RobotTypeBrand;
    model: RobotTypeModel;
    tasksAvailable: TaskType[];
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get robotTypeId(): RobotTypeId {
        return new RobotTypeId(this.robotTypeId.toValue());
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

    get tasksAvailable(): TaskType[] {
        return this.props.tasksAvailable;
    }

    set tasksAvailable(value: TaskType[]) {
        this.props.tasksAvailable = value;
    }

    private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(RobotTypeProps: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {
        const type = RobotTypeProps.type;
        const brand = RobotTypeProps.brand;
        const model = RobotTypeProps.model;
        const tasksAvailable = RobotTypeProps.tasksAvailable;

        if (!!type === false) {
            return Result.fail<RobotType>('Must provide a robot type type');
        } else if (!!brand === false) {
            return Result.fail<RobotType>('Must provide a robot type brand');
        } else if (!!model === false) {
            return Result.fail<RobotType>('Must provide a robot type model');
        } else if (!!tasksAvailable === false) {
            return Result.fail<RobotType>('Must provide a robot type tasks available');
        } else {
            const robotType = new RobotType(
                { type: type, brand: brand, model: model, tasksAvailable: tasksAvailable },
                id,
            );
            return Result.ok<RobotType>(robotType);
        }
    }
}
