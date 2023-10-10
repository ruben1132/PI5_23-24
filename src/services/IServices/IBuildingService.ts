import { Result } from '../../core/logic/Result';
import IBuildingDTO from '../../dto/IBuildingDTO';

export default interface IBuildingService  {
  getBuildings (): Promise<Result<Array<IBuildingDTO>>>;
  createBuilding(BuildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  getBuildingsByFloorRange(min: number, max: number): Promise<Result<IBuildingDTO[]>>;
  updateBuilding(roleDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
}
