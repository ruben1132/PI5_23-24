interface Size {
    width: number;
    height?: number;
    depth: number;
}

interface Position {
    positionX: number;
    positionY: number;
    direction: string;
}

export interface IFloorMapPersistence {
    _id: string;
    floor: string;
    file: string;
}
