import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorMapController from "./IControllers/IFloorMapController";
import IFloorMapService from '../services/IServices/IFloorMapService';
import {IFloorMapDTO} from '../dto/IFloorMapDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorMapController implements IFloorMapController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.floorMap.name) private floorMapServiceInstance: IFloorMapService
    ) { }

    public async createFloorMap(req: Request & { file: any }, res: Response, next: NextFunction) {
        
        try {
            const jsonContent = JSON.parse(req.file.buffer.toString());
            
            const floorMapOrError = await this.floorMapServiceInstance.createFloorMap(jsonContent as IFloorMapDTO) as Result<IFloorMapDTO>;

            if (floorMapOrError.isFailure) {
                return res.status(400).send({ error: floorMapOrError.errorValue() });
            }

            const FloorMapDTO = floorMapOrError.getValue();
            return res.json(FloorMapDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };


    public async getFloorMaps(req: Request, res: Response, next: NextFunction) {
        try {
            const floorMapsOrError = await this.floorMapServiceInstance.getFloorMaps() as Result<Array<IFloorMapDTO>>;

            if (floorMapsOrError.isFailure) {
                return res.status(400).send({ error: floorMapsOrError.errorValue() });
            }

            return res.json(floorMapsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getFloorMapByFloorId(req: Request, res: Response, next: NextFunction) {
        try {
            const floorMapsOrError = await this.floorMapServiceInstance.getFloorMapByFloorId(req.params.id) as Result<IFloorMapDTO>;

            if (floorMapsOrError.isFailure) {
                return res.status(400).send({ error: floorMapsOrError.errorValue() });
            }

            return res.json(floorMapsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    //   public async updateFloorMap(req: Request, res: Response, next: NextFunction) {
    //     try {
    //       const floorMapOrError = await this.floorMapServiceInstance.updateFloorMap(req.body as IFloorMapDTO) as Result<IFloorMapDTO>;

    //       if (floorMapOrError.isFailure) {
    //         return res.status(400).send({ error: floorMapOrError.errorValue()});
    //       }

    //       const floorMapDTO = floorMapOrError.getValue();
    //       return res.status(201).json(floorMapDTO);
    //     }
    //     catch (e) {
    //       return next(e);
    //     }
    //   };


}