import { Service, Inject } from 'typedi';

import ITaskRepo from '../services/IRepos/ITaskRepo';
import { Task } from '../domain/task';

import { TaskId } from '../domain/valueObj/taskId';
import { TaskMap } from '../mappers/TaskMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';

@Service()
export default class TaskRepo implements ITaskRepo {
    private models: any;

    constructor(@Inject('taskSchema') private taskSchema: Model<ITaskPersistence & Document>) {}
    async gettask(): Promise<Task[]> {
       
            const task = await this.taskSchema.find({});
    
            if (task != null) {
                return task.map(task => TaskMap.toDomain(task));
            } else return null;
        
    }
    async deleteTask(taskId: string | TaskId): Promise<boolean> {
        const query = { domainId: taskId };
        const taskRecord = await this.taskSchema.findOne(query as FilterQuery<ITaskPersistence & Document>);

        if (taskRecord != null) {
            await taskRecord.remove();
            return true;
        } else return null;
       
    }
    async getTaskById(taskId: string): Promise<Task> {
        try {
            const query = { domainId: taskId };
            const taskRecord = await this.taskSchema.findOne(query as FilterQuery<ITaskPersistence & Document>);

            if (taskRecord != null) {
                return TaskMap.toDomain(taskRecord);
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(task: Task): Promise<boolean> {
        const idX = task.domainId instanceof TaskId ? (<TaskId>task.domainId).toValue() : task.domainId;

        const query = { domainId: idX };
        const taskDocument = await this.taskSchema.findOne(query as FilterQuery<ITaskPersistence & Document>);

        return !!taskDocument === true;
    }

    public async save(task: Task): Promise<Task> {
        const query = { domainId: task.domainId.toString() };

        const taskDocument = await this.taskSchema.findOne(query);

        try {
            if (taskDocument === null) {
                const rawTask: any = TaskMap.toPersistence(task);

                const taskCreated = await this.taskSchema.create(rawTask);

                return TaskMap.toDomain(taskCreated);
            } else {
                taskDocument.id = task.id;
                
                await taskDocument.save();

                return task;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(taskId: TaskId | string): Promise<Task> {
        const task = await this.taskSchema.findOne({ domainId: taskId });

        if (task != null) {
            return TaskMap.toDomain(task);
        }

        return null;
    }

    public async findByIds(taskIds: TaskId[] | string[]): Promise<Task[]> {
        const task = await this.taskSchema.find({ domainId: { $in: taskIds } });

        if (task != null && task.length > 0) {
            return task.map(task => TaskMap.toDomain(task));
        }

        return null;
    }

    // public async getTask(): Promise<Task[]> {
    //     const task = await this.taskSchema.find({});

    //     if (task != null) {
    //         return task.map(task => TaskMap.toDomain(task));
    //     } else return null;
    // }

    // public async gettaskById(taskId: string): Promise<Task> {
    //     try {
    //         const query = { domainId: taskId };
    //         const taskRecord = await this.taskSchema.findOne(query as FilterQuery<ITaskPersistence & Document>);

    //         if (taskRecord != null) {
    //             return TaskMap.toDomain(taskRecord);
    //         }

    //         return null;
    //     } catch (error) {
    //         return null;
    //     }
    // }

    // public async deletetask(taskId: TaskId | string): Promise<boolean> {
    //     const query = { domainId: taskId };
    //     const taskRecord = await this.taskSchema.findOne(query as FilterQuery<ITaskPersistence & Document>);

    //     if (taskRecord != null) {
    //         await taskRecord.remove();
    //         return true;
    //     } else return null;
    // }
}
