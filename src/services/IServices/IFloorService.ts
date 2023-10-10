import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService {

  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  getFloorByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>>;
  getFloors (): Promise<Result<Array<IFloorDTO>>>;
}