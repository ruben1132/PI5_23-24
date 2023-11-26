import { TaskType } from './TaskType';

export interface RobotType {
    id: string;
    type: string;
    brand: string;
    model: string;
    tasksAllowed: string[];
}

export interface RobotTypeWithTaskTypes {
    id: string;
    type: string;
    brand: string;
    model: string;
    tasksAllowed: TaskType[];
}
