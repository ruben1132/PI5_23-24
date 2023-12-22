import { Task, TaskWithUser } from "./Task";

export interface SurveillanceTask extends TaskWithUser {
    phoneNumber: string;
    floorCode: string;
}

export interface CreateSurveillanceTask{
    phoneNumber: string;
    floorId: string;
}