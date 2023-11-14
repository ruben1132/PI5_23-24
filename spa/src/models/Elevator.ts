import { Floor } from './Floor';

export interface Elevator {
    id: string;
    designation: string;
    floorsAllowed: string[];
}

export interface ElevatorWithFloors {
    id: string;
    designation: string;
    floorsAllowed: Floor[];
}
