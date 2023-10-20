import { Service, Inject } from 'typedi';

import IPassageRepo from "../services/IRepos/IPassageRepo";
import { Passage } from "../domain/passage";
import { PassageId } from "../domain/valueObj/passageId";
import { PassageMap } from "../mappers/PassageMap";
import { FloorMap } from "../mappers/FloorMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';

@Service()
export default class PassageRepo implements IPassageRepo {
    private models: any;

    constructor(
        @Inject('passageSchema') private passageSchema: Model<IPassagePersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(passage: Passage): Promise<boolean> {

        const idX = passage.id instanceof PassageId ? (<PassageId>passage.id).toValue() : passage.id;

        const query = { domainId: idX };
        const passageDocument = await this.passageSchema.findOne(query as FilterQuery<IPassagePersistence & Document>);

        return !!passageDocument === true;
    }

    public async save(passage: Passage): Promise<Passage> {
        const query = { domainId: passage.id.toString() };

        const passageDocument = await this.passageSchema.findOne(query);

        try {
            if (passageDocument === null) {
                const rawPassage: any = PassageMap.toPersistence(passage);

                const passageCreated = await this.passageSchema.create(rawPassage);

                // console.log(passageCreated);

                return PassageMap.toDomain(passageCreated);
            } else {
                passageDocument.designation = passage.designation.toString();
                passageDocument.fromFloor = passage.fromFloor.toString();
                passageDocument.toFloor = passage.toFloor.toString();

                await passageDocument.save();

                return passage;
            }
        } catch (err) {
            throw err;
        }
    }

    public async getPassages(): Promise<Passage[]> {
        try {
            const pipeline = [
                {
                    $lookup: {
                        from: 'floors', // Name of the "floors" collection
                        localField: 'fromFloor', // Field in the "passages" collection
                        foreignField: 'domainId', // Field in the "floors" collection
                        as: 'fromFloorData'
                    }
                },
                {
                    $lookup: {
                        from: 'floors', // Name of the "floors" collection
                        localField: 'toFloor', // Field in the "passages" collection
                        foreignField: 'domainId', // Field in the "floors" collection
                        as: 'toFloorData'
                    }
                }
            ];

            const passagesWithFloorData = await this.passageSchema.aggregate(pipeline);

            if (passagesWithFloorData) {
                // Map the raw MongoDB documents to your custom Passage objects
                const passagesWithCustomFloorData = passagesWithFloorData.map((passage) => {
                    // Convert the 'fromFloorData' and 'toFloorData' fields to custom Floor objects
                    const fromFloor = FloorMap.toDomain(passage.fromFloorData[0]); // Assuming a one-to-one relationship
                    const toFloor = FloorMap.toDomain(passage.toFloorData[0]); // Assuming a one-to-one relationship

                    // Merge the converted objects with the rest of the passage data
                    return { ...passage, fromFloor, toFloor };
                });

                return passagesWithCustomFloorData.map((passage) => PassageMap.toDomain(passage));
            } else {
                console.log("No matching data found.");
                return [];
            }
        } catch (error) {
            console.error("Error during aggregation:", error);
            return [];
        }
    }

    public async getPassagesBetweenBuildings(first: string, second: string): Promise<Passage[]> {
        try {
            const pipeline = [
                {
                    $lookup: {
                        from: 'floors', // Name of the "floors" collection
                        localField: 'fromFloor', // Field in the "passages" collection
                        foreignField: 'domainId', // Field in the "floors" collection
                        as: 'fromFloorData'
                    }
                },
                {
                    $lookup: {
                        from: 'floors', // Name of the "floors" collection
                        localField: 'toFloor', // Field in the "passages" collection
                        foreignField: 'domainId', // Field in the "floors" collection
                        as: 'toFloorData'
                    }
                }
            ];

            const passagesWithFloorData = await this.passageSchema.aggregate(pipeline);

            if (passagesWithFloorData) {
                // Map the raw MongoDB documents to your custom Passage objects
                const passagesWithCustomFloorData = passagesWithFloorData.map((passage) => {
                    //console.log(first.toString());
                    //console.log(passage.fromFloorData[0].building);
                    // Convert the 'fromFloorData' and 'toFloorData' fields to custom Floor objects
                    if( (passage.fromFloorData[0].building.code.toString() === first && passage.toFloorData[0].building.code.toString() === second) 
                    ||  (passage.fromFloorData[0].building.code.toString() === second && passage.toFloorData[0].building.code.toString() === first)){
                        
                        const fromFloor = FloorMap.toDomain(passage.fromFloorData[0]); // Assuming a one-to-one relationship
                        const toFloor = FloorMap.toDomain(passage.toFloorData[0]); // Assuming a one-to-one relationship

                        return { ...passage, fromFloor, toFloor };
                    }
                    /*const fromFloor = FloorMap.toDomain(passage.fromFloorData[0]); // Assuming a one-to-one relationship
                    const toFloor = FloorMap.toDomain(passage.toFloorData[0]); // Assuming a one-to-one relationship

                    // Merge the converted objects with the rest of the passage data
                    return { ...passage, fromFloor, toFloor };*/
                });

                return passagesWithCustomFloorData.map((passage) => PassageMap.toDomain(passage));
            } else {
                console.log("No matching data found.");
                return [];
            }
        } catch (error) {
            console.error("Error during aggregation:", error);
            return [];
        }
    }


    public async findByDomainId(passageId: PassageId | string): Promise<Passage> {
        const query = { domainId: passageId };
        const passageRecord = await this.passageSchema.findOne(query as FilterQuery<IPassagePersistence & Document>);

        if (passageRecord != null) {
            return PassageMap.toDomain(passageRecord);
        }

        return null;
    }

    public async findByIds(rolesIds: PassageId[] | string[]): Promise<Passage[]> {
        const query = { domainId: { $in: rolesIds } };
        const passageRecord = await this.passageSchema.find(query as FilterQuery<IPassagePersistence & Document>);

        if (passageRecord != null) {
            return passageRecord.map((passage) => PassageMap.toDomain(passage));
        }

        return null;
    }

    public async deletePassage(passageId: PassageId | string): Promise<Boolean> {

        try {
            const query = { domainId: passageId };
            const passageRecord = await this.passageSchema.findOne(query as FilterQuery<IPassagePersistence & Document>);

            if (passageRecord != null) {
                await passageRecord.remove();
                return true;
            }

            return null;
        } catch (err) {
            throw err;
        }
    }
}