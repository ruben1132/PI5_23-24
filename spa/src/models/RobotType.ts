import { TaskType } from './TaskType';

export interface RobotType {
    id: number;
    type: string;
    brand: string;
    model: string;
    tasksAllowed: string[];
}

export interface RobotTypeWithTaskTypes {
    id: number;
    type: string;
    brand: string;
    model: string;
    tasksAllowed: TaskType[];
}
