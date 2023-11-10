import IFloorDTO from './IFloorDTO';

export interface IElevatorDTO {
    id: string;
    designation: string;
    floorsAllowed: string[];
}

export interface IElevatorWithFloorsDTO {
    id: string;
    designation: string;
    floorsAllowed: IFloorDTO[];
}
