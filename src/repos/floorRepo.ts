import { Service, Inject } from 'typedi';

import IFloorRepo from "../services/IRepos/IFloorRepo";
import { Floor } from "../domain/floor";
import { Building } from "../domain/building";
import { FloorId } from "../domain/valueObj/floorId";
import { FloorMap } from "../mappers/FloorMap";
import { BuildingMap } from "../mappers/BuildingMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

@Service()
export default class FloorRepo implements IFloorRepo {
    private models: any;

    constructor(
        @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(floor: Floor): Promise<boolean> {

        const idX = floor.id instanceof FloorId ? (<FloorId>floor.id).toValue() : floor.id;

        const query = { domainId: idX };
        const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

        return !!floorDocument === true;
    }

    public async save(floor: Floor): Promise<Floor> {
        const query = { domainId: floor.id.toString() };

        const floorDocument = await this.floorSchema.findOne(query);

        try {
            if (floorDocument === null) {
                const rawFloor: any = FloorMap.toPersistence(floor);

                const floorCreated = await this.floorSchema.create(rawFloor);

                return FloorMap.toDomain(floorCreated);
            } else {
                floorDocument.number = floor.number;
                floorDocument.information = floor.information.toString();
                floorDocument.building = floor.building.toString();

                await floorDocument.save();

                return floor;
            }
        } catch (err) {
            throw err;
        }
    }

    public async getFloors(): Promise<Floor[]> {
        const floorRecord = await this.floorSchema.find({});

        if (floorRecord != null) {
            return floorRecord.map((floor) => FloorMap.toDomain(floor));
        }
        else
            return null;
    }

    public async findByDomainId(floorId: FloorId | string): Promise<Floor> {
        const query = { domainId: floorId };
        const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

        if (floorRecord != null) {
            return FloorMap.toDomain(floorRecord);
        }

        return null;
    }

    public async getFloorsByBuildingId(buildingId: string): Promise<Floor[]> {
        const query = { building: buildingId };
        const floorRecord = await this.floorSchema.find(query as FilterQuery<IFloorPersistence & Document>);

        if (floorRecord != null) {
            return floorRecord.map((floor) => FloorMap.toDomain(floor));
        }
        else
            return null;
    }

    
    public async getBuildingsByFloorRange(min: number, max: number): Promise<Building[]> {
            
        try {
            const buildingRecords = await this.floorSchema.aggregate([
                {
                    $group: {
                        _id: '$building',
                        count: { $sum: 1 },
                    },
                },
                {
                    $match: {
                        count: { $gte: min, $lte: max },
                    },
                },
                {
                    $lookup: {
                        from: 'buildings', // Replace with the actual name of your 'Building' collection
                        localField: '_id',
                        foreignField: 'domainId', // Adjust this to the actual field that links buildings and floors
                        as: 'buildingInfo',
                    },
                },
                {
                    $unwind: '$buildingInfo',
                },
                {
                    $project: {
                        code: '$buildingInfo.code',
                        name: '$buildingInfo.name',
                        dimensions: '$buildingInfo.dimensions',
                        domainId: '$buildingInfo.domainId',
                    },
                },
            ]);

            if (buildingRecords) {
                return buildingRecords.map((building) => BuildingMap.toDomain(building));
            } else {
                console.error("Error occurred during query execution");
                return [];
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}