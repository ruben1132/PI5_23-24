import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotController from "./IControllers/IRobotController";
import IRobotService from '../services/IServices/IRobotService';
import {IRobotDTO, IRobotWithRobotTypeDTO} from '../dto/IRobotDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.robot.name) private robotServiceInstance: IRobotService
    ) { }

    public async createRobot(req: Request, res: Response, next: NextFunction) {
        try {

            const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

            if (robotOrError.isFailure) {
                return res.status(400).send({ error: robotOrError.errorValue() });
            }

            const RobotDTO = robotOrError.getValue();
            return res.json(RobotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async inhibitRobot(req: Request, res: Response, next: NextFunction) {
        try {
            const robotId = req.body.robotId;
            const robotOrError = await this.robotServiceInstance.inhibitRobot(robotId as string) as Result<IRobotDTO>;

            if (robotOrError.isFailure) {
                return res.status(400).send({ error: robotOrError.errorValue() });
            }

            const RobotDTO = robotOrError.getValue();
            return res.json(RobotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getRobots(req: Request, res: Response, next: NextFunction) {
        try {
            const robotsOrError = await this.robotServiceInstance.getRobots() as Result<Array<IRobotWithRobotTypeDTO>>;


            if (robotsOrError.isFailure) {
                return res.status(400).send({ error: robotsOrError.errorValue() });
            }

            return res.json(robotsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getRobotById(req: Request, res: Response, next: NextFunction) {
        try {
            const robotId = req.params.id;
            const robotOrError = await this.robotServiceInstance.getRobotById(robotId) as Result<IRobotWithRobotTypeDTO>;

            if (robotOrError.isFailure) {
                return res.status(400).send({ error: robotOrError.errorValue() });
            }

            const robotDTO = robotOrError.getValue();
            return res.json(robotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }


    public async updateRobot(req: Request, res: Response, next: NextFunction) {

        try {
            const robotOrError = await this.robotServiceInstance.updateRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

            if (robotOrError.isFailure) {
                return res.status(400).send({ error: robotOrError.errorValue() });
            }

            const robotDTO = robotOrError.getValue();
            return res.json(robotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async deleteRobot(req: Request, res: Response, next: NextFunction) {
        try {
            const robotOrError = await this.robotServiceInstance.deleteRobot(req.params.id) as Result<void>;

            if (robotOrError.isFailure) {
                return res.status(400).send({ error: robotOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "Robot deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }


}
