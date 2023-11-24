import { locationType } from "./LocationType";

export interface TasksWithLocationType {
    id: string;
    initialType: locationType;
    finalType : locationType;
    path : string;
}
export interface Tasks {
    id: string;
    initialType: string;
    finalType : string;
    path : string;
}

