export interface IFloorMapSchemaPersistence {
    _id: string;
    floor: string;
    map: number[][];
    rooms: {
        roomId: string;
        positionX: number;
        positionY: number;
        width: number;
        height: number;

    }[];
    doors: {
        positionX: number;
        positionY: number;
        width: number;
        height: number;
        direction: string;
    }[];
    elevator: {
        elevatorId: string;
        positionX: number;
        positionY: number;
        direction: string;  
    };
    passages: {
        passageId: string;
        positionX: number;
        positionY: number;
        direction: string;
    }[];
}

