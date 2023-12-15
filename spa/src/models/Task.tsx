import { UserTaskInfo } from "./UserTaskInfo";

export interface Task {
    id: string;
    user: UserTaskInfo;
    taskType: string;
    path: string;
    robotMovements: [
        [
            {
                x: number;
                y: number;
            },
        ],
    ];
    originType: string;
    origin: string;
    destinyType: string;
    destiny: string;
    isCompleted?: boolean;
    isApproved?: boolean;
}
