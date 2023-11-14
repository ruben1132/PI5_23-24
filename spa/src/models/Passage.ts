import { Floor } from './Floor';

export interface Passage {
    id: string;
    designation: string;
    fromFloor: string;
    toFloor: string;
}

export interface PassageWithFloor {
    id: string;
    designation: string;
    fromFloor: Floor;
    toFloor: Floor;
}
