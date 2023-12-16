import { Task } from "./Task";

export interface SurveillanceTask extends Task {
    phoneNumber: string;
    floorCode: string;
}

export interface CreateSurveillanceTask{
    phoneNumber: string;
    floorCode: string;
}