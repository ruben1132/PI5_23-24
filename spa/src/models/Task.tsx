import { UserTaskInfo } from "./UserTaskInfo";

export interface TaskWithUser {
    id?: string;
    user: UserTaskInfo;
    taskType: string;
    isCompleted?: boolean;
    isApproved?: boolean;
    lastUpdated: string;
}

export interface Task {
    id?: string;
    taskType: string;
    isCompleted?: boolean;
    isApproved?: string;
    lastUpdated: string;
}