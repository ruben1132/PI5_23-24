import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IPlanningController from './IControllers/IPlanningController';
import IPlanningService from '../services/IServices/IPlanningService';
import { IPlanningDTO } from '../dto/IPlanningDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class PlanningController implements IPlanningController /* TODO: extends ../core/infra/BaseController */ {
    constructor(@Inject(config.services.planning.name) private planningServiceInstance: IPlanningService) {}


    public async findPath(req: Request, res: Response, next: NextFunction) {
        try {
            const { algorithm, origin, destiny } = req.query as { algorithm?: string; origin?: string, destiny?: string };

            if (!algorithm || !origin || !destiny) {
                return res.status(400).json({ error: 'Missing query parameters' });
            }

            const result = await this.planningServiceInstance.findPath(algorithm, origin, destiny) as Result<IPlanningDTO>;

            if (result.isFailure) {
                return res.status(400).json({ error: result.error });
            }

            const planning = result.getValue() as IPlanningDTO;

            return res.json(planning).status(201);
        } catch (e) {
            return next(e);
        }
    }

}
