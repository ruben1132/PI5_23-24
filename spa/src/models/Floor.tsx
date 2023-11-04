import { Building } from "./Building";

export interface Floor {
  id: string;
  number: number;
  information: string;
  building: Building;
}
