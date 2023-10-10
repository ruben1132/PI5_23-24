import { Building } from "../domain/building";

export default interface IPassageDTO {
    designation: string; 
    fromBuilding: Building;
    toBuilding: Building;
}
