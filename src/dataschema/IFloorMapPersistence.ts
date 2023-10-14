export interface IFloorMapPersistence {
    _id: string;
    floor: string;
    map: number[][];
    rooms: {
        roomId: string;
        startX: number;
        startY: number;
        endX: number;
        endY: number;

    }[];
    doors: {
        positionX: number;
        positionY: number;
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

