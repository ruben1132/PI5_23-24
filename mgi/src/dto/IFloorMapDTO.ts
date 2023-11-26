export interface IFloorMapDTO {
    floor: string;
    fmElevator: {
        elevatorId: string;
    };
    fmRooms: {
        roomId: string;
    }[];
    fmPassages?: {
        passageId: string;
    }[];
}

export interface IFloorMapWithFileDTO {
    floor: string;
    file: string;
}
