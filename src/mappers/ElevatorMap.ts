import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

import IElevatorDTO from "../dto/IElevatorDTO";
import { Elevator } from "../domain/elevator";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ElevatorDesignation } from "../domain/valueObj/elevatorDesignation";

export class ElevatorMap extends Mapper<Elevator> {
  
  public static toDTO( elevator: Elevator): IElevatorDTO {
    return {
      id: elevator.id.toString(),
      designation: elevator.elevatorDesignation.value,
      building: elevator.building.id.toValue(),
      //floorsAllowed: elevator.floorsAllowed.value,
    } as IElevatorDTO;
  }

  public static toDomain(elevator: any | Model<IElevatorPersistence & Document>): Elevator {
    /*const elevatorDesignationOrError = ElevatorDesignation.create(elevator.designation);
    const elevatorBuildingOrError = 

    const elevatorOrError = Elevator.create({
      designation: elevatorDesignationOrError.getValue(),
      building: buildingNameOrError.getValue(),
      //floorsAllowed: ,
    }, new UniqueEntityID(elevator.domainId));*/

    const elevatorOrError = Elevator.create(
      elevator,
      new UniqueEntityID(elevator.id)
  );
    
    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence (elevator: Elevator): any {
    return {
      id: elevator.id.toString(),
      designation: elevator.elevatorDesignation.value,
      building: elevator.building.id.toString()
    }
  }
}