import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { ElevatorId } from "./valueObj/elevatorId";

// import IElevatorDTO from "../dto/IElevatorDTO"; // TODO: criar o DTO

interface ElevatorProps {
    designation: string; //TODO: criar um value obj para designacoes/informacoes (meter um max de chars por exemplo)
    building: Building;
    floorsAllowed: number[];
}

export class Elevator extends AggregateRoot<ElevatorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get elevatorId(): ElevatorId {
        return new ElevatorId(this.elevatorId.toValue());
    }
        
    get building(): Building {
        return this.props.building;
    }
    
    private constructor(props: ElevatorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma elevator
    //   public static create (props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
    //     const designation = props.designation;

    //     if (!!designation === false || designation.length === 0) {
    //       return Result.fail<Elevator>('Must provide a elevator name')
    //     } else {
    //       const role = new Elevator({ designation: designation }, id);
    //       return Result.ok<Elevator>( role )
    //     }
    //   }
}
