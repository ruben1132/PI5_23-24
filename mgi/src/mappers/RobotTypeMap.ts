import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';

import { IRobotTypeDTO, IRobotTypeWithTasksDTO } from '../dto/IRobotTypeDTO';
import { RobotType } from '../domain/robotType';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { RobotTypeType } from '../domain/valueObj/robotTypeType';
import { RobotTypeBrand } from '../domain/valueObj/robotTypeBrand';
import { RobotTypeModel } from '../domain/valueObj/robotTypeModel';
import { TaskType } from '../domain/taskType';
import ITaskTypeDTO from '../dto/ITaskTypeDTO';

export class RobotTypeMap extends Mapper<RobotType> {
    public static toDTO(robotType: RobotType): IRobotTypeDTO {
        return {
            id: robotType.id.toString(),
            type: robotType.type.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            tasksAllowed: robotType.tasksAllowed.map(taskType => {
                return taskType.toString();
            }),
        } as IRobotTypeDTO;
    }

    public static toDTOWithTask(robotType: RobotType, tasks: TaskType[]): IRobotTypeWithTasksDTO {
        return {
            id: robotType.id.toString(),
            type: robotType.type.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            tasksAllowed: tasks.map(task => {
                return {
                    id: task.id.toString(),
                    name: task.name,
                    description: task.description,
                } as ITaskTypeDTO;
            }),
        } as IRobotTypeWithTasksDTO;
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
                tasksAllowed: robotType.tasksAllowed,
            },
            new UniqueEntityID(robotType.domainId),
        );

        RobotTypeOrError.isFailure ? console.log(RobotTypeOrError.errorValue()) : '';

        return RobotTypeOrError.isSuccess ? RobotTypeOrError.getValue() : null;
    }

    public static toPersistence(robotType: RobotType): any {
        return {
            domainId: robotType.id.toString(),
            type: robotType.type.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            tasksAllowed: robotType.tasksAllowed.map(taskType => {
                return taskType.toString();
            }),
        };
    }
}
