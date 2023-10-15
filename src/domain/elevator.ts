import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";

import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { ElevatorId } from "./valueObj/elevatorId";
import { ElevatorDesignation } from "./valueObj/elevatorDesignation";

import IElevatorDTO from "../dto/IElevatorDTO"; 

interface ElevatorProps {
    designation: ElevatorDesignation;
    building: Building;
    //floorsAllowed: [Number];
}

export class Elevator extends AggregateRoot<ElevatorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get elevatorId(): ElevatorId {
        return new ElevatorId(this.elevatorId.toValue());
    }

    get elevatorDesignation(): ElevatorDesignation {
        return this.props.designation
    }

    get building(): Building {
        return this.props.building;
    }

    private constructor(props: ElevatorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma elevator
    public static create(props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
        const guardedProps = [
            { argument: props.designation, argumentName: 'designation' },
            { argument: props.building, argumentName: 'building' },
            //{ argument: props.floorsAllowed, argumentName: 'floorsAllowed' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Elevator>(guardResult.message)
        }

        return Result.ok<Elevator>(new Elevator({ ...props }, id))
    }

}
