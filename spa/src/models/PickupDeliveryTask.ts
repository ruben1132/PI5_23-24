import { Task } from "./Task";

export interface PickupDeliveryTask extends Task {
    pickupPersonName: string;
    pickupPersonPhoneNumber: string;
    deliveryPersonName: string;
    deliveryPersonPhoneNumber: string;
    taskDescription: string;
    confirmationCode: string;
}