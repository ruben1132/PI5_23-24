import { Building } from "./Building";
import { Floor, FloorWithBuilding } from "./Floor";
import { RoomWithFloor } from "./Room";
import { TaskType } from "./TaskType";

export interface TasksWithBuildings {
    id: string;
    buildinginicial : Building;
    floorInicial : FloorWithBuilding;
    roomInicial : RoomWithFloor;
    buildingFinal : Building;
    floorFinal : FloorWithBuilding;
    roomFinal : RoomWithFloor;
    type : TaskType;
    path : string;
}
export interface Tasks {
    id: string;
    buildinginicial : string;
    floorInicial : string;
    roomInicial : string;
    buildingFinal : string;
    floorFinal : string;
    roomFinal : string;
    type : string;
    path : string;
}
