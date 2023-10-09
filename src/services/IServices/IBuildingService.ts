import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
  createBuilding(BuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  getBuildingsByFloorRange(idMin: string, idMax: string): Promise<Result<IBuildingDTO[]>>;
}
