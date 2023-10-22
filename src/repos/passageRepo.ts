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
                        from: 'floors',
                        localField: 'fromFloor',
                        foreignField: 'domainId',
                        as: 'fromFloor'
                    }
                },
                {
                    $unwind: '$fromFloor'
                },
                {
                    $lookup: {
                        from: 'floors',
                        localField: 'toFloor',
                        foreignField: 'domainId',
                        as: 'toFloor'
                    }
                },
                {
                    $unwind: '$toFloor'
                },
                {
                    $lookup: {
                        from: 'buildings',
                        localField: 'fromFloor.building',
                        foreignField: 'domainId',
                        as: 'fromBuilding'
                    }
                },
                {
                    $unwind: {
                        path: '$fromBuilding',
                    }
                },
                {
                    $lookup: {
                        from: 'buildings',
                        localField: 'toFloor.building',
                        foreignField: 'domainId',
                        as: 'toBuilding'
                    }
                },
                {
                    $unwind: {
                        path: '$toBuilding',
                    }
                },
                {
                    $project: {
                        _id: 1,
                        domainId: 1,
                        designation: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        __v: 1,
                        fromFloor: {
                            $mergeObjects: ['$fromFloor', { building: '$fromBuilding' }]
                        },
                        toFloor: {
                            $mergeObjects: ['$toFloor', { building: '$toBuilding' }]
                        }
                    }
                }
            ];

            const passagesWithFloorData = await this.passageSchema.aggregate(pipeline);

            if (passagesWithFloorData) {
                return passagesWithFloorData.map((passage) => PassageMap.toDomain(passage));
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }

    public async getPassagesBetweenBuildings(from: PassageId | string, to: PassageId | string): Promise<Passage[]> {
        try {
            const pipeline = [
                {
                    $match: {
                        $or: [
                            {
                                fromBuilding: from, // Filter by the "from" building ID or name
                                toBuilding: to,     // Filter by the "to" building ID or name
                            },
                            {
                                fromBuilding: to,     // Filter by the "to" building ID or name
                                toBuilding: from, // Filter by the "from" building ID or name
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: 'floors',
                        localField: 'fromFloor',
                        foreignField: 'domainId',
                        as: 'fromFloor'
                    }
                },
                {
                    $unwind: '$fromFloor'
                },
                {
                    $lookup: {
                        from: 'floors',
                        localField: 'toFloor',
                        foreignField: 'domainId',
                        as: 'toFloor'
                    }
                },
                {
                    $unwind: '$toFloor'
                },
                {
                    $lookup: {
                        from: 'buildings',
                        localField: 'fromFloor.building',
                        foreignField: 'domainId',
                        as: 'fromBuilding'
                    }
                },
                {
                    $unwind: {
                        path: '$fromBuilding',
                    }
                },
                {
                    $lookup: {
                        from: 'buildings',
                        localField: 'toFloor.building',
                        foreignField: 'domainId',
                        as: 'toBuilding'
                    }
                },
                {
                    $unwind: {
                        path: '$toBuilding',
                    }
                },
                {
                    $project: {
                        _id: 1,
                        domainId: 1,
                        designation: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        __v: 1,
                        fromFloor: {
                            $mergeObjects: ['$fromFloor', { building: '$fromBuilding' }]
                        },
                        toFloor: {
                            $mergeObjects: ['$toFloor', { building: '$toBuilding' }]
                        }
                    }
                }
            ];

            const passagesWithFloorData = await this.passageSchema.aggregate(pipeline);

            if (passagesWithFloorData) {
                return passagesWithFloorData.map((passage) => PassageMap.toDomain(passage));
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }


    public async findByDomainId(passageId: PassageId | string): Promise<Passage> {
        const pipeline = [
            {
                $match: { domainId: passageId }
            },
            {
                $lookup: {
                    from: 'floors',
                    localField: 'fromFloor',
                    foreignField: 'domainId',
                    as: 'fromFloor'
                }
            },
            {
                $unwind: '$fromFloor'
            },
            {
                $lookup: {
                    from: 'floors',
                    localField: 'toFloor',
                    foreignField: 'domainId',
                    as: 'toFloor'
                }
            },
            {
                $unwind: '$toFloor'
            },
            {
                $lookup: {
                    from: 'buildings',
                    localField: 'fromFloor.building',
                    foreignField: 'domainId',
                    as: 'fromBuilding'
                }
            },
            {
                $unwind: {
                    path: '$fromBuilding',
                }
            },
            {
                $lookup: {
                    from: 'buildings',
                    localField: 'toFloor.building',
                    foreignField: 'domainId',
                    as: 'toBuilding'
                }
            },
            {
                $unwind: {
                    path: '$toBuilding',
                }
            }
        ];

        const passagesWithFloorData = await this.passageSchema.aggregate(pipeline);

        if (passagesWithFloorData != null) {

            return  PassageMap.toDomain(passagesWithFloorData[0]);
        }

        return null;
    }

    public async findByIds(passageIds: PassageId[] | string[]): Promise<Passage[]> {
        const pipeline = [
            {
                $match: { domainId: { $in: passageIds } }
            },
            {
                $lookup: {
                    from: 'floors',
                    localField: 'fromFloor',
                    foreignField: 'domainId',
                    as: 'fromFloor'
                }
            },
            {
                $unwind: '$fromFloor'
            },
            {
                $lookup: {
                    from: 'floors',
                    localField: 'toFloor',
                    foreignField: 'domainId',
                    as: 'toFloor'
                }
            },
            {
                $unwind: '$toFloor'
            },
            {
                $lookup: {
                    from: 'buildings',
                    localField: 'fromFloor.building',
                    foreignField: 'domainId',
                    as: 'fromBuilding'
                }
            },
            {
                $unwind: {
                    path: '$fromBuilding',
                }
            },
            {
                $lookup: {
                    from: 'buildings',
                    localField: 'toFloor.building',
                    foreignField: 'domainId',
                    as: 'toBuilding'
                }
            },
            {
                $unwind: {
                    path: '$toBuilding',
                }
            },
            {
                $project: {
                    _id: 1,
                    domainId: 1,
                    designation: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    __v: 1,
                    fromFloor: {
                        $mergeObjects: ['$fromFloor', { building: '$fromBuilding' }]
                    },
                    toFloor: {
                        $mergeObjects: ['$toFloor', { building: '$toBuilding' }]
                    }
                }
            }
        ];

        const passagesWithFloorData = await this.passageSchema.aggregate(pipeline);

        if (passagesWithFloorData != null) {

            return passagesWithFloorData.map((passage) => PassageMap.toDomain(passage));
        }

        return [];
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