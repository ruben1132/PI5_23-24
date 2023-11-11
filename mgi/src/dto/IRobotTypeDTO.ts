import ITaskTypeDTO from "./ITaskTypeDTO";

export interface IRobotTypeDTO {
    id: string;
    type: string;
    brand: string;
    model: string;
    tasksAllowed: string[];
}

export interface IRobotTypeWithTasksDTO {
    id: string;
    type: string;
    brand: string;
    model: string;
    tasksAllowed: ITaskTypeDTO[];
}
