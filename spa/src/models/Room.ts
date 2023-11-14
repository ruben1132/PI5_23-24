import { Floor } from './Floor';

export interface RoomWithFloor {
    id: string;
    number: string;
    floor: Floor;
}

export interface Room {
    id: string;
    number: string;
    floor: string;
}
