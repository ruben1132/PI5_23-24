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
    maze: {
        size: Size;
        map: number[][];
        exitLocation: [number, number];
    };
    ground: {
        size: Size;
        segments: Size;
        primaryColor: string;
        maps: {
            color: {
                url: string;
            };
            ao: {
                url: string;
                intensity: number;
            };
            displacement: {
                url: string;
                scale: number;
                bias: number;
            };
            normal: {
                url: string;
                type: number;
                scale: Size;
            };
            bump: {
                url: string;
                scale: number;
            };
            roughness: {
                url: string;
                rough: number;
            };
        };
        wrapS: number;
        wrapT: number;
        repeat: {
            u: number;
            v: number;
        };
        magFilter: number;
        minFilter: number;
        secondaryColor: string;
    };
    wall: {
        segments: Size;
        primaryColor: string;
        maps: {
            color: {
                url: string;
            };
            ao: {
                url: string;
                intensity: number;
            };
            displacement: {
                url: string;
                scale: number;
                bias: number;
            };
            normal: {
                url: string;
                type: number;
                scale: Size;
            };
            bump: {
                url: string;
                scale: number;
            };
            roughness: {
                url: string;
                rough: number;
            };
        };
        wrapS: number;
        wrapT: number;
        repeat: {
            u: number;
            v: number;
        };
        magFilter: number;
        minFilter: number;
        secondaryColor: string;
    };
    player: {
        initialPosition: [number, number];
        initialDirection: number;
    };
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
