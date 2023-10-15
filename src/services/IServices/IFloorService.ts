import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService {

  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  getFloors (): Promise<Result<Array<IFloorDTO>>>;
  getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>>;

  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  deleteFloor(floorId: string): Promise<Result<void>>;
}
