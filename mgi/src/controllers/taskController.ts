import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITaskController from "./IControllers/ITaskController";
import ITaskService from '../services/IServices/ITaskServise';
import {ITaskDTO, } from '../dto/ITaskDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class taskController implements ITaskController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.task.name) private taskServiceInstance: ITaskService
    ) { }
    getTask(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error('Method not implemented.');
    }

    public async createTask(req: Request, res: Response, next: NextFunction) {
        try {

            const taskOrError = await this.taskServiceInstance.createTask(req.body as ITaskDTO) as Result<ITaskDTO>;

            if (taskOrError.isFailure) {
                return res.status(400).send({ error: taskOrError.errorValue() });
            }

            const TaskDTO = taskOrError.getValue();
            return res.json(TaskDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };



    public async getTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const taskOrError = await this.taskServiceInstance.getTaskById(req.params.id) as Result<ITaskDTO>;

            if (taskOrError.isFailure) {
                return res.status(400).send({ error: taskOrError.errorValue() });
            }

            return res.json(taskOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }




    public async updateTask(req: Request, res: Response, next: NextFunction) {

        try {
            const taskOrError = await this.taskServiceInstance.updateTask(req.body as ITaskDTO) as Result<ITaskDTO>;

            if (taskOrError.isFailure) {
                return res.status(400).send({ error: taskOrError.errorValue() });
            }

            const TaskDTO = taskOrError.getValue();
            return res.json(TaskDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const taskOrError = await this.taskServiceInstance.deleteTask(req.params.id) as Result<void>;

            if (taskOrError.isFailure) {
                return res.status(400).send({ error: taskOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "Task deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }


}