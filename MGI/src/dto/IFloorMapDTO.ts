export default interface IFloorMapDTO {
    floor: string;
    map: number[][];
    fmRooms: {
        roomId: string;
        startX: number;
        startY: number;
        endX: number;
        endY: number;

    }[];
    fmDoors: {
        positionX: number;
        positionY: number;
        direction: string;
    }[];
    fmElevator: {
        elevatorId: string;
        positionX: number;
        positionY: number;
        direction: string; 
    };
    fmPassages: {
        passageId: string;
        positionX: number;
        positionY: number;
        direction: string;
    }[];
    wallTexture: string;
    groundTexture: string;
    doorTexture: string;
    elevatorTexture: string;
}
