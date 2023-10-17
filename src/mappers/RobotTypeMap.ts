import { Container } from 'typedi';

import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';

import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import { RobotType } from '../domain/robotType';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import BuildingRepo from '../repos/buildingRepo';
import { RobotTypeType } from '../domain/valueObj/robotTypeType';
import { RobotTypeBrand } from '../domain/valueObj/robotTypeBrand';
import { RobotTypeModel } from '../domain/valueObj/robotTypeModel';

export class RobotTypeMap extends Mapper<RobotType> {
    public static toDTO(RobotType: RobotType): IRobotTypeDTO {

        return {
            domainId: RobotType.id.toString(),
            type: RobotType.type.value,
            brand: RobotType.brand.value,
            model: RobotType.model.value,
            tasksAvailable: RobotType.tasksAvailable as any,
        } as IRobotTypeDTO;
    }

    public static async toDomain(robotType: any | Model<IRobotTypePersistence & Document>): Promise<RobotType> {

        const type = RobotTypeType.create(robotType.type);
        const brand = RobotTypeBrand.create(robotType.brand);
        const model = RobotTypeModel.create(robotType.model);

        const RobotTypeOrError = RobotType.create(
            {
                type: type.getValue(),
                brand: brand.getValue(),
                model: model.getValue(),
                tasksAvailable: robotType.tasksAvailable as any,
            },
            new UniqueEntityID(robotType.domainId),
        );

        RobotTypeOrError.isFailure ? console.log(RobotTypeOrError.error) : '';

        return RobotTypeOrError.isSuccess ? RobotTypeOrError.getValue() : null;
    }

    public static toPersistence(RobotType: RobotType): any {
        return {
            domainId: RobotType.id.toString(),
            type: RobotType.type.value,
            brand: RobotType.brand.value,
            model: RobotType.model.value,
            tasksAvailable: RobotType.tasksAvailable as any,
        };
    }
}
