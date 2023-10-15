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
            id: floor.id.toString(),
            number: floor.number.value,
            information: floor.information.value,
            building: floor.building.id.toValue()
        } as IFloorDTO;
    }

    public static toDomain(floor: any | Model<IFloorPersistence & Document>): Floor {

        const floorOrError = Floor.create(
            floor,
            new UniqueEntityID(floor.domainId)
        );

        floorOrError.isFailure ? console.log(floorOrError.error) : '';

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