import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotTypeController from "./IControllers/IRobotTypeController";
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import { IRobotTypeDTO, IRobotTypeWithTasksDTO } from '../dto/IRobotTypeDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotTypeController implements IRobotTypeController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.robotType.name) private robotTypeServiceInstance: IRobotTypeService
    ) { }

    public async createRobotType(req: Request, res: Response, next: NextFunction) {
        try {

            const robotTypeOrError = await this.robotTypeServiceInstance.createRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;

            if (robotTypeOrError.isFailure) {
                return res.status(400).send({ error: robotTypeOrError.errorValue() });
            }

            const RobotTypeDTO = robotTypeOrError.getValue();
            return res.json(RobotTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };


    public async getRobotTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypesOrError = await this.robotTypeServiceInstance.getRobotTypes() as Result<Array<IRobotTypeWithTasksDTO>>;


            if (robotTypesOrError.isFailure) {
                return res.status(400).send({ error: robotTypesOrError.errorValue() });
            }

            return res.json(robotTypesOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getRobotTypeById(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypeOrError = await this.robotTypeServiceInstance.getRobotTypeById(req.params.id) as Result<IRobotTypeWithTasksDTO>;

            if (robotTypeOrError.isFailure) {
                return res.status(400).send({ error: robotTypeOrError.errorValue() });
            }

            const robotTypeDTO = robotTypeOrError.getValue();
            return res.json(robotTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }


    public async updateRobotType(req: Request, res: Response, next: NextFunction) {

        try {
            const robotTypeOrError = await this.robotTypeServiceInstance.updateRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;

            if (robotTypeOrError.isFailure) {
                return res.status(400).send({ error: robotTypeOrError.errorValue() });
            }

            const robotTypeDTO = robotTypeOrError.getValue();
            return res.json(robotTypeDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async deleteRobotType(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypeOrError = await this.robotTypeServiceInstance.deleteRobotType(req.params.id) as Result<void>;

            if (robotTypeOrError.isFailure) {
                return res.status(400).send({ error: robotTypeOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "RobotType deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }


}
