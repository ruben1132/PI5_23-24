import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";
import { FloorId } from "../../domain/valueObj/floorId";

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  findByDomainId (floorId: FloorId | string): Promise<Floor>;
  getFloorByBuildingId (buildingId: string): Promise<Floor[]>;
    
  //findByIds (floorsIds: FloorId[]): Promise<Floor[]>;
  //saveCollection (floors: Floor[]): Promise<Floor[]>;
  //removeByFloorIds (floors: FloorId[]): Promise<any>
}