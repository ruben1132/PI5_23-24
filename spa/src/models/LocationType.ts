import { Elevator } from "./Elevator";
import { Passage } from "./Passage";
import { Room } from "./Room";

export interface locationType {
    
   location : string;
}

export interface locationTypeWithRoom {
    
    location : Room;
 }

 export interface locationTypeWithElevator {
    
    location : Elevator;
 }

 export interface locationTypeWithPassage {
    
    location : Passage;
 }