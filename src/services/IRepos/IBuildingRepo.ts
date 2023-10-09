import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building";
import { BuildingId } from "../../domain/valueObj/buildingId";

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  findByDomainId (buildingId: BuildingId | string): Promise<Building>;
  getBuildingsByFloorRange(idMin: string, idMax: string): Promise<Building[]>;
    
  //findByIds (buildingsIds: BuildingId[]): Promise<Building[]>;
  //saveCollection (buildings: Building[]): Promise<Building[]>;
  //removeByBuildingIds (buildings: BuildingId[]): Promise<any>
  getBuildings(): Promise<Building[]>;
}