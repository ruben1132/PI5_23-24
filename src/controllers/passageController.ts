import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPassageController from "./IControllers/IPassageController";
import IPassageService from '../services/IServices/IPassageService';
import IPassageDTO from '../dto/IPassageDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PassageController implements IPassageController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.passage.name) private passageServiceInstance: IPassageService
    ) { }

    public async createPassage(req: Request, res: Response, next: NextFunction) {
        try {
            const passageOrError = await this.passageServiceInstance.createPassage(req.body as IPassageDTO) as Result<IPassageDTO>;

            if (passageOrError.isFailure) {
                return res.status(400).send({ error: passageOrError.errorValue() });
            }

            const PassageDTO = passageOrError.getValue();
            return res.json(PassageDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };


    public async getPassages(req: Request, res: Response, next: NextFunction) {
        try {
            const passagesOrError = await this.passageServiceInstance.getPassages() as Result<Array<IPassageDTO>>;

            if (passagesOrError.isFailure) {
                return res.status(400).send({ error: passagesOrError.errorValue() });
            }

            return res.json(passagesOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getPassagesBetweenBuildings(req: Request, res: Response, next: NextFunction) {
        try {
            const passagesOrError = await this.passageServiceInstance.getPassagesBetweenBuildings(req.body.first as string, req.body.second as string) as Result<Array<IPassageDTO>>;

            if (passagesOrError.isFailure) {
                return res.status(400).send({ error: passagesOrError.errorValue() });
            }

            return res.json(passagesOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async updatePassage(req: Request, res: Response, next: NextFunction) {
        try {
            const passageOrError = await this.passageServiceInstance.updatePassage(req.body as IPassageDTO) as Result<IPassageDTO>;

            if (passageOrError.isFailure) {
                return res.status(404).send({ error: passageOrError.errorValue() });
            }

            const passageDTO = passageOrError.getValue();
            return res.status(201).json(passageDTO);
        }
        catch (e) {
            return next(e);
        }
    };

    public async deletePassage(req: Request, res: Response, next: NextFunction) {
        try {
            const passagesOrError = await this.passageServiceInstance.deletePassage(req.params.id) as Result<void>;

            if (passagesOrError.isFailure) {
                return res.status(400).send({ error: passagesOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: "Passage deleted successfully" });
        }
        catch (e) {
            return next(e);
        }
    }



}