import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Guard } from '../core/logic/Guard';

import { Result } from '../core/logic/Result';
import { TaskType } from './taskType';
import { RobotId } from './valueObj/robotId';
import { RobotIdentification } from './valueObj/robotIdentification';
import { RobotNickname } from './valueObj/robotNickname';
import { RobotSerialNumber } from './valueObj/robotSerialNumber';
import { RobotDescription } from './valueObj/robotDescription';
import { RobotState } from './valueObj/robotState';
import { RobotType } from './robotType';


interface RobotProps {
    // TODO:

    identification: RobotIdentification;
    nickname: RobotNickname;
    robotType: RobotType;
    serialNumber: RobotSerialNumber;
    description: RobotDescription;
    state: RobotState;
}

export class Robot extends AggregateRoot<RobotProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get robotId(): RobotId {
        return new RobotId(this.id.toValue());
    }

    get identification(): RobotIdentification {
        return this.props.identification;
    }

    set identification(value: RobotIdentification) {
        this.props.identification = value;
    }

    get nickname(): RobotNickname {
        return this.props.nickname;
    }

    set nickname(value: RobotNickname) {
        this.props.nickname = value;
    }

    get robotType(): RobotType {
        return this.props.robotType;
    }

    set robotType(value: RobotType) {
        this.props.robotType = value;
    }

    get serialNumber(): RobotSerialNumber {
        return this.props.serialNumber;
    }

    set serialNumber(value: RobotSerialNumber) {
        this.props.serialNumber = value;
    }

    get description(): RobotDescription {
        return this.props.description;
    }

    set description(value: RobotDescription) {
        this.props.description = value;
    }

    get state(): RobotState {
        return this.props.state;
    }

    set state(value: RobotState) {
        this.props.state = value;
    }

    private constructor(props: RobotProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: RobotProps, id?: UniqueEntityID): Result<Robot> {
        const guardedProps = [
            { argument: props.identification, argumentName: 'identification' },
            { argument: props.robotType, argumentName: 'robotType' },
            { argument: props.serialNumber, argumentName: 'serialNumber' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.state, argumentName: 'state' },
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Robot>(guardResult.message);
        }

        const robot = new Robot({ ...props }, id);
        return Result.ok<Robot>(robot);
    }
}
