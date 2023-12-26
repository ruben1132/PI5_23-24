import { Result } from "../../core/logic/Result";
import {IFloorDTO, IFloorWithBuildingDTO} from "../../dto/IFloorDTO";

export default interface IFloorService {

  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  getFloors (): Promise<Result<Array<IFloorWithBuildingDTO>>>;
  getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>>;
  getFloorsWithPassages(): Promise<Result<Array<IFloorWithBuildingDTO>>>;
  getFloorById(floorId: string): Promise<Result<IFloorWithBuildingDTO>>;
  getFloorByCode(floorCode: string): Promise<Result<IFloorWithBuildingDTO>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  deleteFloor(floorId: string): Promise<Result<void>>;
}
