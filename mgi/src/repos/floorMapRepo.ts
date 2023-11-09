import { Service, Inject } from 'typedi';

import IFloorMapRepo from '../services/IRepos/IFloorMapRepo';
import { FloorMap } from '../domain/floorMap';
import { FloorMapId } from '../domain/valueObj/floorMapId';
import { FloorMapMap } from '../mappers/FloorMapMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorMapPersistence } from '../dataschema/IFloorMapPersistence';

@Service()
export default class FloorMapRepo implements IFloorMapRepo {
    private models: any;

    constructor(@Inject('floorMapSchema') private floorMapSchema: Model<IFloorMapPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(floorMap: FloorMap): Promise<boolean> {
        const idX = floorMap.id instanceof FloorMapId ? (<FloorMapId>floorMap.id).toValue() : floorMap.id;

        const query = { domainId: idX };
        const floorMapDocument = await this.floorMapSchema.findOne(
            query as FilterQuery<IFloorMapPersistence & Document>,
        );

        return !!floorMapDocument === true;
    }

    public async save(floorMap: FloorMap): Promise<FloorMap> {
        const query = { floor: floorMap.floor.toString() };

        // looks for a floorMap with the same floor id
        const floorMapDocument = await this.floorMapSchema.findOne(query);

        try {
            if (floorMapDocument === null) {
                const rawFloorMap: any = FloorMapMap.toPersistence(floorMap);

                const floorMapCreated = await this.floorMapSchema.create(rawFloorMap);

                return FloorMapMap.toDomain(floorMapCreated);
            } else {
                const fmPersistence = FloorMapMap.toPersistence(floorMap);

                floorMapDocument.floor = floorMap.floor.toString();
                floorMapDocument.map = fmPersistence.map;
                floorMapDocument.fmRooms = fmPersistence.fmRooms;
                floorMapDocument.fmDoors = fmPersistence.fmDoors;
                floorMapDocument.fmElevator = fmPersistence.fmElevator;
                floorMapDocument.fmPassages = fmPersistence.fmPassages;
                floorMapDocument.wallTexture = fmPersistence.wallTexture;
                floorMapDocument.groundTexture = fmPersistence.groundTexture;
                floorMapDocument.doorTexture = fmPersistence.doorTexture;
                floorMapDocument.elevatorTexture = fmPersistence.elevatorTexture;

                await floorMapDocument.save();

                return floorMap;
            }
        } catch (err) {
            throw err;
        }
    }

    public async getFloorMaps(): Promise<FloorMap[]> {
        const floorMapRecord = await this.floorMapSchema.find({});

        if (floorMapRecord != null) {
            return floorMapRecord.map(floorMap => FloorMapMap.toDomain(floorMap));
        } else return null;
    }

    public async findByDomainId(floorMapId: FloorMapId | string): Promise<FloorMap> {
        const query = { domainId: floorMapId };
        const floorMapRecord = await this.floorMapSchema.findOne(query as FilterQuery<IFloorMapPersistence & Document>);

        if (floorMapRecord != null) {
            return FloorMapMap.toDomain(floorMapRecord);
        }

        return null;
    }

    public async getFloorMapByFloorId(floorId: string): Promise<FloorMap> {
        const query = { floor: floorId };
        const floorMapRecord = await this.floorMapSchema.findOne(query as FilterQuery<IFloorMapPersistence & Document>);

        if (floorMapRecord != null) {
            return FloorMapMap.toDomain(floorMapRecord);
        }

        return null;
    }
}
