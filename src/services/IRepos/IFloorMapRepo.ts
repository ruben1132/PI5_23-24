import { Repo } from "../../core/infra/Repo";
import { FloorMap } from "../../domain/floorMap";
import { FloorMapId } from "../../domain/valueObj/floorMapId";

export default interface IFloorMapRepo extends Repo<FloorMap> {
    save(floorMap: FloorMap): Promise<FloorMap>;
    findByDomainId(floorMapId: FloorMapId | string): Promise<FloorMap>;
    getFloorMaps(): Promise<FloorMap[]>;
    getFloorMapByFloorId(floorId: string): Promise<FloorMap>;

    //findByIds (floorMapsIds: FloorMapId[]): Promise<FloorMap[]>;
    //saveCollection (floorMaps: FloorMap[]): Promise<FloorMap[]>;
    //removeByFloorMapIds (floorMaps: FloorMapId[]): Promise<any>
}