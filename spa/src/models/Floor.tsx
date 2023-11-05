import { Building } from "./Building";

export interface FloorWithBuilding {
  id: string;
  number: number;
  information: string;
  building: Building;
}

export interface Floor {
  id: string;
  number: number;
  information: string;
  building: string;
}