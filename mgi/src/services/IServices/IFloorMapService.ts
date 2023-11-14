import { Result } from "../../core/logic/Result";
import {IFloorMapDTO, IFloorMapWithFileDTO} from "../../dto/IFloorMapDTO";

export default interface IFloorMapService {

  createFloorMap(floorMapDTO: IFloorMapDTO): Promise<Result<IFloorMapWithFileDTO>>;
  getFloorMaps (): Promise<Result<Array<IFloorMapWithFileDTO>>>;
  getFloorMapByFloorId(floorId: string): Promise<Result<IFloorMapWithFileDTO>>;
}
