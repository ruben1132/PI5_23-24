import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDTO from '../dto/IBuildingDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.building.name) private buildingServiceInstance : IBuildingService
  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;
      
      if (buildingOrError.isFailure) {
        return res.status(500).send();
      }

      const BuildingDTO = buildingOrError.getValue();
      return res.json( BuildingDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      const rolesOrError = await this.buildingServiceInstance.getBuildings() as Result<Array<IBuildingDTO>>;

      if (rolesOrError.isFailure) {
        return res.status(400).send();
      }

      return res.json(rolesOrError.getValue()).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

}