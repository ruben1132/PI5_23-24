import { IFloorDTO } from "./IFloorDTO";

export interface IPassageDTO {
    id: string;
    designation: string;
    fromFloor: string;
    toFloor: string;
}

export interface IPassageWithFloorDTO {
    id: string;
    designation: string;
    fromFloor: IFloorDTO;
    toFloor: IFloorDTO;
}

