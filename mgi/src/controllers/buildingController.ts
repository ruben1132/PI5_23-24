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
        @Inject(config.services.building.name) private buildingServiceInstance: IBuildingService
    ) { }

    public async createBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

            if (buildingOrError.isFailure) {
                return res.status(400).send({ error: buildingOrError.errorValue() });
            }

            const BuildingDTO = buildingOrError.getValue();
            return res.json(BuildingDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getBuildingsByFloorRange(req: Request, res: Response, next: NextFunction) {
        try {
            const min = Number(req.params.min);
            const max = Number(req.params.max);
            const buildingOrError = await this.buildingServiceInstance.getBuildingsByFloorRange(min, max) as Result<IBuildingDTO[]>;

            if (buildingOrError.isFailure) {
                return res.status(400).send({ error: buildingOrError.errorValue() });
            }

            const BuildingDTOs = buildingOrError.getValue();
            return res.json(BuildingDTOs).status(200);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getBuildings(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingsOrError = await this.buildingServiceInstance.getBuildings() as Result<Array<IBuildingDTO>>;

            if (buildingsOrError.isFailure) {
                return res.status(400).send({ error: buildingsOrError.errorValue() });
            }

            return res.json(buildingsOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getBuildingById(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = await this.buildingServiceInstance.getBuildingById(req.params.id) as Result<IBuildingDTO>;

            if (buildingOrError.isFailure) {
                return res.status(404).send({ error: buildingOrError.errorValue() });
            }

            const buildingDTO = buildingOrError.getValue();
            return res.status(201).json(buildingDTO);
        }
        catch (e) {
            return next(e);
        }
    }

    public async updateBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

            if (buildingOrError.isFailure) {
                return res.status(404).send({ error: buildingOrError.errorValue() });
            }

            const buildingDTO = buildingOrError.getValue();
            return res.status(201).json(buildingDTO);
        }
        catch (e) {
            return next(e);
        }
    };

    public async deleteBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = await this.buildingServiceInstance.deleteBuilding(req.params.id) as Result<void>;

            if (buildingOrError.isFailure) {
                return res.status(404).send({ error: buildingOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "Building deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }


}