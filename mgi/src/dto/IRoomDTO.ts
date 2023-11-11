import { IFloorDTO } from "./IFloorDTO";

export interface IRoomDTO {
    id: string;
    number: string;
    floor: string;
}

export interface IRoomWithFloorDTO {
    id: string;
    number: string;
    floor: IFloorDTO;
}
