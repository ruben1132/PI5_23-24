import IRobotTypeDTO from "./IRobotTypeDTO";

export interface IRobotDTO {
    id: string;
    identification: string;
    nickname: string;
    robotType: string
    serialNumber: string;
    description: string;
    state: boolean;
}

export interface IRobotWithRobotTypeDTO{
    id: string;
    identification: string;
    nickname: string;
    robotType: IRobotTypeDTO
    serialNumber: string;
    description: string;
    state: boolean;
}
