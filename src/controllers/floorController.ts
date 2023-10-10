import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorController from "./IControllers/IFloorController";
import IFloorService from '../services/IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';

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
        return res.status(400).send({ error: floorOrError.errorValue()});
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
            const floorsOrError = await this.floorServiceInstance.getFloors() as Result<Array<IFloorDTO>>;

            if (floorsOrError.isFailure) {
                return res.status(400).send({ error: floorOrError.errorValue()});
            }

            return res.json(floorsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getFloorsByBuildingId(req: Request, res: Response, next: NextFunction) {
        try {
            const floorsOrError = await this.floorServiceInstance.getFloorsByBuildingId(req.params.id) as Result<Array<IFloorDTO>>;

            if (floorsOrError.isFailure) {
                return res.status(400).send({ error: floorsOrError.errorValue()});
            }

            return res.json(floorsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    //   public async updateFloor(req: Request, res: Response, next: NextFunction) {
    //     try {
    //       const floorOrError = await this.floorServiceInstance.updateFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

    //       if (floorOrError.isFailure) {
    //         return res.status(404).send({ error: floorOrError.errorValue()});
    //       }

    //       const floorDTO = floorOrError.getValue();
    //       return res.status(201).json(floorDTO);
    //     }
    //     catch (e) {
    //       return next(e);
    //     }
    //   };


}