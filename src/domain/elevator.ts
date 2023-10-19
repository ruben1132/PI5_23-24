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
    get domainId(): UniqueEntityID {
        return this._id;
    }

    get elevatorDomainId(): ElevatorId {
        return new ElevatorId(this.elevatorDomainId.toValue());
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
        const floorsAllowed = props.floorsAllowed;

        if (!!designation === false || designation === null) {
            return Result.fail<Elevator>('Must provide an elevator designation')
        }
        if (!!floorsAllowed === false || floorsAllowed === null) {
            return Result.fail<Elevator>('Must provide floors')
        }
        
        const elevator = new Elevator({ designation: designation, floorsAllowed: floorsAllowed }, domainId);
        return Result.ok<Elevator>(elevator)
    }

}
