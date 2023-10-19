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
    //building: Building;
    //floorsAllowed: [Number];
}

export class Elevator extends AggregateRoot<ElevatorProps> {
    get domainId(): UniqueEntityID {
        return this._id;
    }

    get elevatorDomainId(): ElevatorId {
        return new ElevatorId(this.elevatorDomainId.toValue());
    }

    get elevatorDesignation(): ElevatorDesignation {
        return this.props.designation
    }

    /*get building(): Building {
        return this.props.building;
    }*/

    private constructor(props: ElevatorProps, domainId?: UniqueEntityID) {
        super(props, domainId);
    }

    // TODO: implementar regras de negocio na criacao de uma elevator
    public static create(props: ElevatorProps, domainId?: UniqueEntityID): Result<Elevator> {
        /*const guardedProps = [
            { argument: props.designation, argumentName: 'designation' },
            { argument: props.building, argumentName: 'building' },
            //{ argument: props.floorsAllowed, argumentName: 'floorsAllowed' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Elevator>(guardResult.message)
        }

        return Result.ok<Elevator>(new Elevator({ ...props }, id))*/

        const designation = props.designation;
        //const building = props.building;

        if (!!designation === false || designation === null) {
            return Result.fail<Elevator>('Must provide an elevator designation')
        }
        /*if (!!building === false || building === null) {
            return Result.fail<Elevator>('Must provide a building')
        }*/
        
        const elevator = new Elevator({ designation: designation }, domainId);
        return Result.ok<Elevator>(elevator)
    }

}
