import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';

import IPassageDTO from "../dto/IPassageDTO";
import { Passage } from "../domain/passage";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PassageMap extends Mapper<Passage> {

    public static toDTO(passage: Passage): IPassageDTO {
        return {
            domainId: passage.id.toString(),
            designation: passage.designation,
            fromFloor: passage.fromFloor.id.toValue(),
            toFloor: passage.toFloor.id.toValue()
        } as IPassageDTO;
    }

    public static toDomain(passage: any | Model<IPassagePersistence & Document>): Passage {
        
        const passageOrError = Passage.create(
            {
                designation: passage.designation,
                fromFloor: passage.fromFloor,
                toFloor: passage.toFloor
            },
            new UniqueEntityID(passage.domainId)
        );

        passageOrError.isFailure ? console.log(passageOrError.error) : '';

        return passageOrError.isSuccess ? passageOrError.getValue() : null;
    }

    public static toPersistence(passage: Passage): any {

        return {
            domainId: passage.id.toString(),
            designation: passage.designation,
            fromFloor: passage.fromFloor.id.toString(),
            toFloor: passage.toFloor.id
        }
    }
}