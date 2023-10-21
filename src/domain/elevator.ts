import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";

import { Result } from "../core/logic/Result";
import { Floor } from "./floor";
import { ElevatorId } from "./valueObj/elevatorId";
import { ElevatorDesignation } from "./valueObj/elevatorDesignation";

import IElevatorDTO from "../dto/IElevatorDTO"; 

interface ElevatorProps {
    designation: ElevatorDesignation;
    floorsAllowed: Floor[];
}

export class Elevator extends AggregateRoot<ElevatorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get elevatorDomainId(): ElevatorId {
        return new ElevatorId(this.id.toValue());
    }

    get elevatorDesignation(): ElevatorDesignation {
        return this.props.designation
    }

    get floorsAllowed(): Floor[] {
        return this.props.floorsAllowed
    }

    private constructor(props: ElevatorProps, domainId?: UniqueEntityID) {
        super(props, domainId);
    }

    public static create(props: ElevatorProps, domainId?: UniqueEntityID): Result<Elevator> {
        const guardedProps = [
            { argument: props.designation, argumentName: 'designation' },
            { argument: props.floorsAllowed, argumentName: 'floorsAllowed' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (props.floorsAllowed.length === 0) {
            return Result.fail<Elevator>('Must provide floors');
        }
        
        if (!guardResult.succeeded) {
            return Result.fail<Elevator>(guardResult.message)
        }

        return Result.ok<Elevator>(new Elevator({ ...props }, domainId))

    }

}
