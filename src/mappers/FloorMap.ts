import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

import IFloorDTO from "../dto/IFloorDTO";
import { Floor } from "../domain/floor";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import BuildingRepo from "../repos/buildingRepo";
import { FloorInformation } from '../domain/valueObj/floorInformation';
import { FloorNumber } from '../domain/valueObj/floorNumber';


export class FloorMap extends Mapper<Floor> {

    public static toDTO(floor: Floor): IFloorDTO {

        return {
            domainId: floor.id.toString(),
            number: floor.number.value,
            information: floor.information.value,
            building: floor.building.id.toValue()
        } as IFloorDTO;
    }

    public static async toDomain(floor: any | Model<IFloorPersistence & Document>): Promise<Floor> {

        const information = FloorInformation.create(floor.information);
        const number = FloorNumber.create(floor.number);
        
        const repo = Container.get(BuildingRepo);
        const building = await repo.findByDomainId(floor.building);

        const floorOrError = Floor.create({
            number: number.getValue(),
            information: information.getValue(),
            building: building
        },
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