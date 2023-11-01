import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

import IBuildingDTO from "../dto/IBuildingDTO";
import { Building } from "../domain/building";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { BuildingCode } from "../domain/valueObj/buildingCode";
import { BuildingName } from "../domain/valueObj/buildingName";
import { BuildingDimensions } from "../domain/valueObj/buildingDimensions";

export class BuildingMap extends Mapper<Building> {
  
  public static toDTO( building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      code: building.code.value,
      name: building.name.value,
      dimensions: building.dimensions.value,
    } as IBuildingDTO;
  }

  public static toDomain(building: any | Model<IBuildingPersistence & Document>): Building {
    const buildingCodeOrError = BuildingCode.create(building.code);
    const buildingNameOrError = BuildingName.create(building.name);
    const buildingDimensionsOrError = BuildingDimensions.create(building.dimensions);

    const buildingOrError = Building.create({
      code: buildingCodeOrError.getValue(),
      name: buildingNameOrError.getValue(),
      dimensions: buildingDimensionsOrError.getValue(),
    }, new UniqueEntityID(building.domainId));
    
    buildingOrError.isFailure ? console.log(buildingOrError.errorValue()) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence (building: Building): any {
    return {
      domainId: building.id.toString(),
      code: building.code.value,
      name: building.name.value,
      dimensions: building.dimensions.value,
    }
  }
}