import { Task, TaskWithUser } from './Task';

export interface TaskPlanning {
    id?: string;
    tasks: string[];
}

export interface TaskPlanningWithTasks {
    id: string;
    tasks: Task[];
}
