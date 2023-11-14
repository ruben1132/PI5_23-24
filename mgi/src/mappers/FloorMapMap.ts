import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IFloorMapPersistence } from '../dataschema/IFloorMapPersistence';

import { IFloorMapWithFileDTO } from '../dto/IFloorMapDTO';
import { FloorMap } from '../domain/floorMap';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class FloorMapMap extends Mapper<FloorMap> {
    public static toDTO(floorMap: FloorMap): IFloorMapWithFileDTO {

        return {
            floor: floorMap.floor.toString(),
            file: floorMap.file,
        } as IFloorMapWithFileDTO;
    }

    public static toDomain(floorMap: any | Model<IFloorMapPersistence & Document>): FloorMap {
        const floorMapOrError = FloorMap.create(
            {
                floor: floorMap.floor,
                file: floorMap.file,
            },
            new UniqueEntityID(floorMap.domainId),
        );

        floorMapOrError.isFailure ? console.log(floorMapOrError.error) : '';

        return floorMapOrError.isSuccess ? floorMapOrError.getValue() : null;
    }

    public static toPersistence(fm: FloorMap): any {

        return {
            domainId: fm.id.toString(),
            floor: fm.floor.toString(),
            file: fm.file
        };
    }
}
