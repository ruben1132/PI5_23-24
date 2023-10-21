import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

import IFloorDTO from "../dto/IFloorDTO";
import { Floor } from "../domain/floor";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { FloorNumber } from "../domain/valueObj/floorNumber";
import { FloorInformation } from "../domain/valueObj/floorInformation";
import { Building } from "../domain/building";

export class FloorMap extends Mapper<Floor> {

    public static toDTO(floor: Floor): IFloorDTO {

        return {
            domainId: floor.id.toString(),
            number: floor.number.value,
            information: floor.information.value,
            building: floor.building.id.toValue()
        } as IFloorDTO;
    }

    public static toDomain(floor: any | Model<IFloorPersistence & Document>): Floor {
        
        const information = FloorInformation.create(floor.information).getValue();
        const number = FloorNumber.create(floor.number).getValue();
        
        const floorOrError = Floor.create(
            {
                number: number,
                information: information,
                building: floor.building
            },
            new UniqueEntityID(floor.domainId)
        );

        floorOrError.isFailure ? console.log(floorOrError.errorValue()) : '';

        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }

    public static toPersistence(floor: Floor): any {

        return {
            domainId: floor.id.toString(),
            number: floor.number.value,
            information: floor.information.value,
            building: floor.building.id
        }
    }
}