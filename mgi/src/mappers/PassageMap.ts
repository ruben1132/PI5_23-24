import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';

import { IPassageDTO, IPassageWithFloorDTO } from '../dto/IPassageDTO';
import { Passage } from '../domain/passage';
import { Floor } from '../domain/floor';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { IFloorDTO } from '../dto/IFloorDTO';

export class PassageMap extends Mapper<Passage> {
    public static toDTO(passage: Passage): IPassageDTO {
        return {
            id: passage.id.toString(),
            designation: passage.designation,
            fromFloor: passage.fromFloor.toString(),
            toFloor: passage.toFloor.toString(),
        } as IPassageDTO;
    }

    public static toDTOWithFloor(passage: Passage, fromFloor: Floor, toFloor: Floor): IPassageWithFloorDTO {

        return {
            id: passage.id.toString(),
            designation: passage.designation,
            fromFloor: {
                id: fromFloor.id.toValue(),
                number: fromFloor.number,
                information: fromFloor.information.value,
                code: fromFloor.code,
                building: fromFloor.building.toString(),
            } as IFloorDTO,
            toFloor: {
                id: toFloor.id.toValue(),
                number: toFloor.number,
                information: toFloor.information.value,
                code : toFloor.code,
                building: toFloor.building.toString(),
            } as IFloorDTO,
        } as IPassageWithFloorDTO;
    }

    public static toDomain(passage: any | Model<IPassagePersistence & Document>): Passage {
        const passageOrError = Passage.create(
            {
                designation: passage.designation,
                fromFloor: passage.fromFloor,
                toFloor: passage.toFloor,
            },
            new UniqueEntityID(passage.domainId),
        );

        passageOrError.isFailure ? console.log(passageOrError.error) : '';

        return passageOrError.isSuccess ? passageOrError.getValue() : null;
    }

    public static toPersistence(passage: Passage): any {
        return {
            domainId: passage.id.toString(),
            designation: passage.designation,
            fromFloor: passage.fromFloor.toString(),
            toFloor: passage.toFloor.toString(),
        };
    }
}
