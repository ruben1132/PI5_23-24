import { Service, Inject } from 'typedi';

import IPassageRepo from '../services/IRepos/IPassageRepo';
import { Passage } from '../domain/passage';
import { PassageId } from '../domain/valueObj/passageId';
import { PassageMap } from '../mappers/PassageMap';
import { FloorMap } from '../mappers/FloorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';

@Service()
export default class PassageRepo implements IPassageRepo {
    private models: any;

    constructor(@Inject('passageSchema') private passageSchema: Model<IPassagePersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
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
            const passages = await this.passageSchema.find({});

            if (passages) {
                return passages.map(passage => PassageMap.toDomain(passage));
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }

    public async getPassageById(id: string): Promise<Passage> {
        try {
            const passage = await this.passageSchema.findOne({ domainId: id });

            if (passage) {
                return PassageMap.toDomain(passage);
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    public async getPassagesBetweenBuildings(from: PassageId | string, to: PassageId | string): Promise<Passage[]> {
        try {
            const pipeline = [
                {
                    $lookup: {
                        from: 'floors',
                        localField: 'fromFloor',
                        foreignField: 'domainId',
                        as: 'fromFloorData',
                    },
                },
                {
                    $unwind: '$fromFloorData',
                },
                {
                    $lookup: {
                        from: 'floors',
                        localField: 'toFloor',
                        foreignField: 'domainId',
                        as: 'toFloorData',
                    },
                },
                {
                    $unwind: '$toFloorData',
                },
                {
                    $match: {
                        $or: [
                            {
                                'fromFloorData.building': from,
                                'toFloorData.building': to,
                            },
                            {
                                'fromFloorData.building': to,
                                'toFloorData.building': from,
                            },
                        ],
                    },
                },
            ];

            const passagesWithFloorData = await this.passageSchema.aggregate(pipeline);

            if (passagesWithFloorData) {
                return passagesWithFloorData.map(passage => PassageMap.toDomain(passage));
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }

    public async findByDomainId(passageId: PassageId | string): Promise<Passage> {
        const passage = await this.passageSchema.findOne({ domainId: passageId });

        if (passage != null) {
            return PassageMap.toDomain(passage);
        }

        return null;
    }

    public async findByIds(passageIds: PassageId[] | string[]): Promise<Passage[]> {
        const passages = await this.passageSchema.find({ domainId: { $in: passageIds } });

        if (passages != null && passages.length > 0) {
            return passages.map(passage => PassageMap.toDomain(passage));
        }

        return [];
    }

    public async deletePassage(passageId: PassageId | string): Promise<boolean> {
        try {
            const query = { domainId: passageId };
            const passageRecord = await this.passageSchema.findOne(
                query as FilterQuery<IPassagePersistence & Document>,
            );

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
