import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorController from "./IControllers/IFloorController";
import IFloorService from '../services/IServices/IFloorService';
import {IFloorDTO, IFloorWithBuildingDTO} from '../dto/IFloorDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorController implements IFloorController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.floor.name) private floorServiceInstance: IFloorService
    ) { }

    public async createFloor(req: Request, res: Response, next: NextFunction) {
        try {

            const floorOrError = await this.floorServiceInstance.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

            if (floorOrError.isFailure) {
                return res.status(400).send({ error: floorOrError.errorValue() });
            }

            const FloorDTO = floorOrError.getValue();
            return res.json(FloorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };


    public async getFloors(req: Request, res: Response, next: NextFunction) {
        try {
            
            const floorsOrError = await this.floorServiceInstance.getFloors() as Result<Array<IFloorWithBuildingDTO>>;

            if (floorsOrError.isFailure) {
                return res.status(400).send({ error: floorsOrError.errorValue() });
            }

            return res.json(floorsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getFloorById(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.getFloorById(req.params.id) as Result<IFloorWithBuildingDTO>;

            if (floorOrError.isFailure) {
                return res.status(400).send({ error: floorOrError.errorValue() });
            }

            return res.json(floorOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getFloorsByBuildingId(req: Request, res: Response, next: NextFunction) {
        try {
            const floorsOrError = await this.floorServiceInstance.getFloorsByBuildingId(req.params.id) as Result<Array<IFloorDTO>>;

            if (floorsOrError.isFailure) {
                return res.status(400).send({ error: floorsOrError.errorValue() });
            }

            return res.json(floorsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getFloorsWithPassages(req: Request, res: Response, next: NextFunction) {
        try {
            const floorsOrError = await this.floorServiceInstance.getFloorsWithPassages() as Result<Array<IFloorWithBuildingDTO>>;

            if (floorsOrError.isFailure) {
                return res.status(400).send({ error: floorsOrError.errorValue() });
            }

            return res.json(floorsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async updateFloor(req: Request, res: Response, next: NextFunction) {

        try {
            const floorOrError = await this.floorServiceInstance.updateFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

            if (floorOrError.isFailure) {
                return res.status(400).send({ error: floorOrError.errorValue() });
            }

            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async deleteFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.deleteFloor(req.params.id) as Result<void>;

            if (floorOrError.isFailure) {
                return res.status(400).send({ error: floorOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "Floor deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }


}