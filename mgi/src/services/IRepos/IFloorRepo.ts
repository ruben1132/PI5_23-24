import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";
import { Building } from "../../domain/building";
import { FloorId } from "../../domain/valueObj/floorId";

export default interface IFloorRepo extends Repo<Floor> {
    save(floor: Floor): Promise<Floor>;
    findByDomainId(floorId: FloorId | string): Promise<Floor>;
    findByCode(code: string): Promise<Floor>;
    getFloors(): Promise<Floor[]>;
    getFloorsByBuildingId(buildingId: string): Promise<Floor[]>;
    getFloorsWithPassages(): Promise<Floor[]>;
    getFloorByBuildingAndNumber(buildingId: string, number: number, floorId?: string): Promise<Floor>;
    deleteFloor(floorId: string): Promise<Boolean>;
    //findByIds (floorsIds: FloorId[]): Promise<Floor[]>;
    //saveCollection (floors: Floor[]): Promise<Floor[]>;
    //removeByFloorIds (floors: FloorId[]): Promise<any>
}
