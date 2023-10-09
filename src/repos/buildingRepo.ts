import { Service, Inject } from 'typedi';

import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { Building } from "../domain/building";
import { BuildingId } from "../domain/valueObj/buildingId";
import { BuildingMap } from "../mappers/BuildingMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private models: any;

  constructor(
    @Inject('buildingSchema') private buildingSchema: Model<IBuildingPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(building: Building): Promise<boolean> {

    const idX = building.id instanceof BuildingId ? (<BuildingId>building.id).toValue() : building.id;

    const query = { domainId: idX };
    const buildingDocument = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);

    return !!buildingDocument === true;
  }

  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() };

    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.designation = building.designation;
        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(buildingId: BuildingId | string): Promise<Building> {
    const query = { domainId: buildingId };
    const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);

    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    else
      return null;
  }

  public async getBuildingsByFloorRange(min: string, max: string): Promise<Building[]> {
    const minFloors = min; // Set your minimum number of floors
    const maxFloors = max; // Set your maximum number of floors

    // console.log(minFloors);
    // console.log(maxFloors); 
    try {
      const buildingRecord = await this.buildingSchema.aggregate([
        {
          $lookup: {
            from: 'floors',
            localField: '_id',
            foreignField: 'building',
            as: 'floors',
          },
        },
        {
          $project: {
            // Include other properties as needed
            floorCount: { $size: { $ifNull: ['$floors', []] } }, // Use $ifNull to handle empty 'floors' array
          },
        },
        {
          $match: {
            floorCount: { $gte: minFloors, $lte: maxFloors },
          },
        },
      ]).exec();
    
      console.log(buildingRecord);
    
      if (buildingRecord) {
        return buildingRecord.map((building) => BuildingMap.toDomain(building));
      } else {
        console.error("Error occurred during query execution");
        return [];
      }
    } catch (err) {
      console.error(err);
      // Handle the error appropriately (e.g., return an error response or rethrow)
    }
  }
}