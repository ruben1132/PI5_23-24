import { Building } from "../domain/building";

export default interface IFloorDTO {
  number: number;
  information: string;
  building: Building;
}
