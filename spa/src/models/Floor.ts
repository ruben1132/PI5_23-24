import { Building } from './Building';

export interface FloorWithBuilding {
    id: string;
    code: string;
    number: number;
    information: string;
    building: Building;
}

export interface Floor {
    id: string;
    code: string;
    number: number;
    information: string;
    building: string;
}
