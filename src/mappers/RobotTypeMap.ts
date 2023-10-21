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
    public static toDTO(robotType: RobotType): IRobotTypeDTO {
                        
        return {
            domainId: robotType.id.toString(),
            type: robotType.type.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            tasksAllowed: robotType.tasksAllowed.map((taskType) => { return taskType.domainId.toString() })
            ,
        } as IRobotTypeDTO;
    }

    public static toDomain(robotType: any | Model<IRobotTypePersistence & Document>): RobotType {

        const type = RobotTypeType.create(robotType.type);
        const brand = RobotTypeBrand.create(robotType.brand);
        const model = RobotTypeModel.create(robotType.model);

        const RobotTypeOrError = RobotType.create(
            {
                type: type.getValue(),
                brand: brand.getValue(),
                model: model.getValue(),
                tasksAllowed: robotType.tasksAllowed as any,
            },
            new UniqueEntityID(robotType.domainId),
        );
        
        RobotTypeOrError.isFailure ? console.log(RobotTypeOrError.error) : '';

        return RobotTypeOrError.isSuccess ? RobotTypeOrError.getValue() : null;
    }

    public static toPersistence(robotType: RobotType): any {
        return {
            domainId: robotType.id.toString(),
            type: robotType.type.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            tasksAllowed: robotType.tasksAllowed.map((taskType) => { return taskType.id.toString() })
        };
    }
}
