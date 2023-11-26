import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IElevatorController from "./IControllers/IElevatorController";
import IElevatorService from '../services/IServices/IElevatorService';
import { IElevatorDTO, IElevatorWithFloorsDTO } from '../dto/IElevatorDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class ElevatorController implements IElevatorController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.elevator.name) private elevatorServiceInstance: IElevatorService
    ) { }

    public async createElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(400).send({ error: elevatorOrError.errorValue() });
            }

            const ElevatorDTO = elevatorOrError.getValue();
            return res.json(ElevatorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getElevators(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorsOrError = await this.elevatorServiceInstance.getElevators() as Result<Array<IElevatorWithFloorsDTO>>;

            if (elevatorsOrError.isFailure) {
                return res.status(400).send({ error: elevatorsOrError.errorValue() });
            }

            return res.json(elevatorsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getElevatorById(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.getElevatorById(req.params.id) as Result<IElevatorWithFloorsDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(400).send({ error: elevatorOrError.errorValue() });
            }

            return res.json(elevatorOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async deleteElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.deleteElevator(req.params.id) as Result<void>;

            if (elevatorOrError.isFailure) {
                return res.status(500).send({ error: elevatorOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "Elevator deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }

    public async updateElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(400).send({ error: elevatorOrError.errorValue() });
            }

            const elevatorDTO = elevatorOrError.getValue();
            return res.status(201).json(elevatorDTO);
        }
        catch (e) {
            return next(e);
        }
    };

}
