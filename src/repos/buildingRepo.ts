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
        buildingDocument.code = building.code.value;
        buildingDocument.name = building.name.value;
        buildingDocument.dimensions = building.dimensions.value;
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

      return null;
  }

  public async getBuildingsByFloorRange(min: number, max: number): Promise<Building[]> {
    const minFloors = min; // Set your minimum number of floors
    const maxFloors = max; // Set your maximum number of floors

    try {
      const buildingRecord = await this.buildingSchema.aggregate([
        {
          $project: {
            designation: 1,
            domainId: 1,
            floorCount: { $size: { $ifNull: ['$floors', []] } },
          },
        },
        {
          $match: {
            floorCount: { $gte: min, $lte: max },
          },
        },
      ]).exec();

      // console.log(buildingRecord);
    
      if (buildingRecord) {
        return buildingRecord.map((building) => BuildingMap.toDomain(building));
      } else {
        console.error("Error occurred during query execution");
        return [];
      }
    } catch (err) {
      console.error(err);
      // Handle the error appropriately (e.g., return an error response or rethrow)
      throw err;
    }
  }

  public async getBuildings(): Promise<Building[]> {
    const buildingRecord = await this.buildingSchema.find({});

    if (buildingRecord != null) {
      return buildingRecord.map((building) => BuildingMap.toDomain(building));
    }
    else
      return null;
  }
}