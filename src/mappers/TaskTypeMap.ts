import { Container } from 'typedi';

import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { ITaskTypePersistence } from '../dataschema/ITaskTypePersistence';

import ITaskTypeDTO from '../dto/ITaskTypeDTO';
import { TaskType } from '../domain/taskType';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import BuildingRepo from '../repos/buildingRepo';

export class TaskTypeMap extends Mapper<TaskType> {
    public static toDTO(TaskType: TaskType): ITaskTypeDTO {
        return {
            domainId: TaskType.id.toString(),
            name: TaskType.name.toString(),
            description: TaskType.description.toString(),
        } as ITaskTypeDTO;
    }

    public static async toDomain(taskType: any | Model<ITaskTypePersistence & Document>): Promise<TaskType> {

        const TaskTypeOrError = TaskType.create(
            {
                name: taskType.name,
                description: taskType.description,
            },
            new UniqueEntityID(taskType.domainId),
        );

        TaskTypeOrError.isFailure ? console.log(TaskTypeOrError.error) : '';

        return TaskTypeOrError.isSuccess ? TaskTypeOrError.getValue() : null;
    }

    public static toPersistence(TaskType: TaskType): any {
        return {
            domainId: TaskType.id.toString(),
            name: TaskType.name.toString(),
            description: TaskType.description.toString(),
        };
    }
}
