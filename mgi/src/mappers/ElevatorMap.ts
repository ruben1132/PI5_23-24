import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

import {IElevatorDTO, IElevatorWithFloorsDTO } from '../dto/IElevatorDTO';

import { Elevator } from '../domain/elevator';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { ElevatorDesignation } from '../domain/valueObj/elevatorDesignation';
import { Floor } from '../domain/floor';
import { IFloorDTO } from '../dto/IFloorDTO';

export class ElevatorMap extends Mapper<Elevator> {
    public static toDTO(elevator: Elevator): IElevatorDTO {
        const fAllowed: string[] = [];

        for (const floor of elevator.floorsAllowed) {
            fAllowed.push(floor.toString());
        }

        return {
            id: elevator.domainId.toString(),
            designation: elevator.elevatorDesignation.value,
            floorsAllowed: fAllowed,
        } as IElevatorDTO;
    }

    public static toDTOWithFloors(elevator: Elevator, floors: Floor[]): IElevatorWithFloorsDTO {
        return {
            id: elevator.domainId.toString(),
            designation: elevator.elevatorDesignation.value,
            floorsAllowed: floors.map(floor => {
                return {
                    id: floor.domainId.toString(),
                    number: floor.number,
                    information: floor.information.value,
                    building: floor.building.toString(),
                } as IFloorDTO;
            }),
        } as IElevatorWithFloorsDTO;
    }

    public static toDomain(elevator: any | Model<IElevatorPersistence & Document>): Elevator {
        const elevatorDesignationOrError = ElevatorDesignation.create(elevator.designation);

        const elevatorOrError = Elevator.create(
            {
                designation: elevatorDesignationOrError.getValue(),
                floorsAllowed: elevator.floorsAllowed,
            },
            new UniqueEntityID(elevator.domainId),
        );

        elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

        return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }

    public static toPersistence(elevator: Elevator): any {
        return {
            domainId: elevator.domainId.toString(),
            designation: elevator.elevatorDesignation.value,
            floorsAllowed: elevator.floorsAllowed.map(floor => floor.toString()),
        };
    }
}
