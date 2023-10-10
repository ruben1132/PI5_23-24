import { TaskType } from "./taskType";

export interface IAutonomous {
    
    designation: string; // TODO: criar um value obj para designacoes (meter um max de chars por exemplo)
    state: boolean;
    taskTypesAllowed: [TaskType]
}
