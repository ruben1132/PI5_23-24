import { Task } from './Task';

export interface PickupDeliveryTask extends Task {
    originType: string;
    origin: string;
    destinyType: string;
    destiny: string;
    pickupPersonName: string;
    pickupPersonPhoneNumber: string;
    deliveryPersonName: string;
    deliveryPersonPhoneNumber: string;
    taskDescription: string;
    confirmationCode: string;
}
