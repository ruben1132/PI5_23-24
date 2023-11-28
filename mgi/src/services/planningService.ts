import { Service, Inject } from 'typedi';
import IPlanningService from './IServices/IPlanningService';
import { Result } from '../core/logic/Result';
import axios from 'axios';

import { IPlanningDTO } from '../dto/IPlanningDTO';
import config from '../../config';

@Service()
export default class PlanningService implements IPlanningService {
    constructor() {}

    public async findPath(algorithm: string, origin: string, destiny : string): Promise<Result<IPlanningDTO>> {
        try {
            const mpRequest = await axios.get(config.mpAPI +`/findPath?algorithm=${algorithm}`+`&origin=${origin}`+`&destiny=${destiny}`);

            const result = Result.ok<IPlanningDTO>(mpRequest.data);

            if (result.isFailure) {
                console.log(result.error);
                
                return Result.fail<IPlanningDTO>(result.error);
            }

            const planning = result.getValue();

            return Result.ok<IPlanningDTO>(planning);
        } catch (e) {
            return Result.fail<IPlanningDTO>(e);
        }
    }
}
