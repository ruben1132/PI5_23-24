interface Size {
    width: number;
    height?: number;
    depth: number;
}

interface Position {
    positionX: number;
    positionY: number;
    direction?: string;
}

export interface IFloorMapDTO {
    floor: string;
    fmDoors: {
        position: Position;
    }[];
    fmElevator: {
        elevatorId: string;
        position: Position;
    };
    fmRooms: {
        roomId: string;
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    }[];
    fmPassages: {
        passageId: string;
        position: Position;
    }[];
}

export interface IFloorMapWithFileDTO {
    floor: string;
    file: string;
}
