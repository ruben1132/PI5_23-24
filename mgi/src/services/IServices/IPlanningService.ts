import { Result } from '../../core/logic/Result';
import {IPlanningDTO} from '../../dto/IPlanningDTO';

export default interface IPlanningService {
   
    findPath(algorithm: string, origin: string, destiny : string): Promise<Result<IPlanningDTO>>;

}
