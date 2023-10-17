import { Service, Inject } from 'typedi';

import ITaskTypeRepo from "../services/IRepos/ITaskTypeRepo";
import { TaskType } from "../domain/taskType";
import { Building } from "../domain/building";
import { TaskTypeId } from "../domain/valueObj/taskTypeId";
import { TaskTypeMap } from "../mappers/TaskTypeMap";
import { BuildingMap } from "../mappers/BuildingMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ITaskTypePersistence } from '../dataschema/ITaskTypePersistence';


@Service()
export default class TaskTypeRepo implements ITaskTypeRepo {
    private models: any;

    constructor(
        @Inject('taskTypeSchema') private taskTypeSchema: Model<ITaskTypePersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(taskType: TaskType): Promise<boolean> {

        const idX = taskType.id instanceof TaskTypeId ? (<TaskTypeId>taskType.id).toValue() : taskType.id;

        const query = { domainId: idX };
        const taskTypeDocument = await this.taskTypeSchema.findOne(query as FilterQuery<ITaskTypePersistence & Document>);

        return !!taskTypeDocument === true;
    }

    public async save(taskType: TaskType): Promise<TaskType> {
        const query = { domainId: taskType.id.toString() };

        const taskTypeDocument = await this.taskTypeSchema.findOne(query);


        try {
            if (taskTypeDocument === null) {
                const rawTaskType: any = TaskTypeMap.toPersistence(taskType);

                const taskTypeCreated = await this.taskTypeSchema.create(rawTaskType);

                return TaskTypeMap.toDomain(taskTypeCreated);
            } else {
                taskTypeDocument.name = taskType.name;
                taskTypeDocument.description = taskType.description;

                await taskTypeDocument.save();

                return taskType;
            }
        } catch (err) {
            throw err;
        }
    }

    public async getTaskTypes(): Promise<Array<TaskType>> {
        try {
            const taskTypes = await this.taskTypeSchema.find({});

            if (taskTypes) {
                const taskTypePromisses = taskTypes.map((taskType) => TaskTypeMap.toDomain(taskType));
                return Promise.all(taskTypePromisses);

            } else {
                console.log("No matching data found.");
                return [];
            }
        } catch (error) {
            console.error("Error during aggregation:", error);
            return [];
        }
    }


    public async findByDomainId(taskTypeId: TaskTypeId | string): Promise<TaskType> {
        const query = { domainId: taskTypeId };

        const taskTypeRecord = await this.taskTypeSchema.findOne(query as FilterQuery<ITaskTypePersistence & Document>);

        if (taskTypeRecord != null) {
            return TaskTypeMap.toDomain(taskTypeRecord);
        }

        return null;
    }

    public async deleteTaskType(taskTypeId: string): Promise<Boolean> {
        try {
            const query = { domainId: taskTypeId };
            const taskTypeRecord = await this.taskTypeSchema.findOne(query as FilterQuery<ITaskTypePersistence & Document>);

            if (taskTypeRecord != null) {
                await taskTypeRecord.remove();
                return true;
            }

            return false;
        } catch (err) {
            throw err;
        }
    }
}
