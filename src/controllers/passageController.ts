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
                return res.status(400).send({ error: passageOrError.errorValue()});
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
                return res.status(400).send({ error: passagesOrError.errorValue()});
            }

            return res.json(passagesOrError.getValue()).status(201);
        }
        catch (e) {
            return next(e);
        }
    }



}