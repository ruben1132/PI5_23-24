import { Service, Inject } from 'typedi';

import IPassageRepo from "../services/IRepos/IPassageRepo";
import { Passage } from "../domain/passage";
import { PassageId } from "../domain/valueObj/passageId";
import { PassageMap } from "../mappers/PassageMap";

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
        const passageRecord = await this.passageSchema.find({});

        if (passageRecord != null) {
            return passageRecord.map((passage) => PassageMap.toDomain(passage));
        }
        else
            return null;
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

}