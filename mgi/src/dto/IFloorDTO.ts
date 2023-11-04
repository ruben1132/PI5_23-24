import IBuildingDTO from './IBuildingDTO';

export interface IFloorDTO {
    id: string;
    number: number;
    information: string;
    building: string;
}

export interface IFloorWithBuildingDTO {
    id: string;
    number: number;
    information: string;
    building: IBuildingDTO;
}
