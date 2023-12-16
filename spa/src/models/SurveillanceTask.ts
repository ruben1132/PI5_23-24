import { Task } from "./Task";

export interface SurveillanceTask extends Task {
    phoneNumber: string;
    floorCode: string;
}