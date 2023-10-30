import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITaskTypeController from "./IControllers/ITaskTypeController";
import ITaskTypeService from '../services/IServices/ITaskTypeService';
import ITaskTypeDTO from '../dto/ITaskTypeDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TaskTypeController implements ITaskTypeController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.taskType.name) private taskTypeServiceInstance: ITaskTypeService
    ) { }

    public async createTaskType(req: Request, res: Response, next: NextFunction) {
        try {

            const taskTypeOrError = await this.taskTypeServiceInstance.createTaskType(req.body as ITaskTypeDTO) as Result<ITaskTypeDTO>;

            if (taskTypeOrError.isFailure) {
                return res.status(400).send({ error: taskTypeOrError.errorValue() });
            }

            const TaskTypeDTO = taskTypeOrError.getValue();
            return res.json(TaskTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };


    public async getTaskTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const taskTypesOrError = await this.taskTypeServiceInstance.getTaskTypes() as Result<Array<ITaskTypeDTO>>;


            if (taskTypesOrError.isFailure) {
                return res.status(400).send({ error: taskTypesOrError.errorValue() });
            }

            return res.json(taskTypesOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }


    public async updateTaskType(req: Request, res: Response, next: NextFunction) {

        try {
            const taskTypeOrError = await this.taskTypeServiceInstance.updateTaskType(req.body as ITaskTypeDTO) as Result<ITaskTypeDTO>;

            if (taskTypeOrError.isFailure) {
                return res.status(400).send({ error: taskTypeOrError.errorValue() });
            }

            const taskTypeDTO = taskTypeOrError.getValue();
            return res.json(taskTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async deleteTaskType(req: Request, res: Response, next: NextFunction) {
        try {
            const taskTypeOrError = await this.taskTypeServiceInstance.deleteTaskType(req.params.id) as Result<void>;

            if (taskTypeOrError.isFailure) {
                return res.status(400).send({ error: taskTypeOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "TaskType deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }


}
