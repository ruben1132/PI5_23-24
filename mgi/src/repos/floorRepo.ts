import { Service, Inject } from 'typedi';

import IFloorRepo from '../services/IRepos/IFloorRepo';
import { Floor } from '../domain/floor';
import { Building } from '../domain/building';
import { FloorId } from '../domain/valueObj/floorId';
import { FloorMap } from '../mappers/FloorMap';
import { BuildingMap } from '../mappers/BuildingMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

import { FloorInformation } from '../domain/valueObj/floorInformation';
import { FloorNumber } from '../domain/valueObj/floorNumber';

@Service()
export default class FloorRepo implements IFloorRepo {
    private models: any;

    constructor(@Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
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
                floorDocument.code = floor.code;
                floorDocument.information = floor.information.value;
                floorDocument.building = floor.building.toString();

                await floorDocument.save();

                return floor;
            }
        } catch (err) {
            throw err;
        }
    }

    public async getFloors(): Promise<Floor[]> {
        try {
            const floors = await this.floorSchema.find({});

            if (floors) {
                return floors.map(floor => FloorMap.toDomain(floor));
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }

    public async findByDomainId(floorId: FloorId | string): Promise<Floor> {
        const floor = await this.floorSchema.findOne({ domainId: floorId });

        if (floor != null) {
            return FloorMap.toDomain(floor);
        }

        return null;
    }

    public async findByCode(code: string): Promise<Floor> {
        const floor = await this.floorSchema.findOne({ code: code });

        if (floor != null) {
            return FloorMap.toDomain(floor);
        }

        return null;
    }

    public async getFloorsByBuildingId(buildingId: string): Promise<Floor[]> {
        try {
            const floors = await this.floorSchema.find({ building: buildingId });

            if (floors != null && floors.length > 0) {
                return floors.map(floor => FloorMap.toDomain(floor));
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error during aggregation:', error);
            return [];
        }
    }

    public async getFloorsWithPassages(): Promise<Floor[]> {
        try {
            const floors = await this.floorSchema.aggregate([
                {
                    $lookup: {
                        from: 'passages',
                        localField: 'domainId', // Assuming 'domainId' is the unique identifier for floors
                        foreignField: 'fromFloor',
                        as: 'fromFloorPassages',
                    },
                },
                {
                    $lookup: {
                        from: 'passages',
                        localField: 'domainId',
                        foreignField: 'toFloor',
                        as: 'toFloorPassages',
                    },
                },
                {
                    $addFields: {
                        passages: {
                            $concatArrays: ['$fromFloorPassages', '$toFloorPassages'],
                        },
                    },
                },
                {
                    $match: {
                        passages: { $exists: true, $ne: [] },
                    },
                },
            ]);
            
            if (floors) {
                return floors.map(floor => FloorMap.toDomain(floor));
            } else {
                return [];
            }
        } catch (error) {
            
            return [];
        }
    }


    public async getFloorByBuildingAndNumber(buildingId: string, number: number, floorId?: string): Promise<Floor> {
        try {
            const floors = await this.floorSchema.findOne({
                building: buildingId,
                number: number,
                domainId: { $ne: floorId },
            });

            if (floors != null) {
                return FloorMap.toDomain(floors);
            }
            return null;
        } catch (error) {
            console.error('Error during aggregation:', error);
            return null;
        }
    }

    public async deleteFloor(floorId: string): Promise<Boolean> {
        try {
            const query = { domainId: floorId };
            const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

            if (floorRecord != null) {
                await floorRecord.remove();
                return true;
            }

            return false;
        } catch (err) {
            throw err;
        }
    }
}
