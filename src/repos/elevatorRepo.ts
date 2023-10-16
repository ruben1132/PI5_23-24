import { Service, Inject } from 'typedi';

import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { Elevator } from '../domain/elevator';
import { ElevatorId } from '../domain/valueObj/elevatorId';
import { ElevatorMap } from "../mappers/ElevatorMap"; 

import { Document, FilterQuery, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

@Service()
export default class ElevatorRepo implements IElevatorRepo {
    private models: any;

    constructor(@Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(elevator: Elevator): Promise<boolean> {
        const idX = elevator.id instanceof ElevatorId ? (<ElevatorId>elevator.id).toValue() : elevator.id;

        const query = { domainId: idX };
        const elevatorDocument = await this.elevatorSchema.findOne(
            query as FilterQuery<IElevatorPersistence & Document>,
        );

        return !!elevatorDocument === true;
    }

    // TODO: so dei copy + paste de outro repo q ja tava feito - fazer as alteracoes necessarias
    public async save(elevator: Elevator): Promise<Elevator> {
        const query = { domainId: elevator.id.toString() };

        const elevatorDocument = await this.elevatorSchema.findOne(query);

        try {
            if (elevatorDocument === null) {
                const rawElevator: any = ElevatorMap.toPersistence(elevator);
                const elevatorCreated = await this.elevatorSchema.create(rawElevator);
                return ElevatorMap.toDomain(elevatorCreated);
            } else {
                elevatorDocument.designation = elevator.elevatorDesignation.value;
                elevatorDocument.building = elevator.building.id.toString();
                await elevatorDocument.save();

                return elevator;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(elevatorId: ElevatorId | string): Promise<Elevator> {
        const query = { domainId: elevatorId };
        const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

        if (elevatorRecord != null) {
            return ElevatorMap.toDomain(elevatorRecord);
        } else return null;
    }

    public async findByIds(elevatorsIds: ElevatorId[] | string[]): Promise<Elevator[]> {
        const query = { domainId: { $in: elevatorsIds } };
        const elevatorRecord = await this.elevatorSchema.find(query as FilterQuery<IElevatorPersistence & Document>);

        if (elevatorRecord != null) {
            return elevatorRecord.map((elevator) => ElevatorMap.toDomain(elevator));
        }

        return null;
    }

    public async getElevators(): Promise<Elevator[]> {
        const elevatorRecord = await this.elevatorSchema.find({});

        if (elevatorRecord != null) {
            return elevatorRecord.map((elevator) => ElevatorMap.toDomain(elevator));
        } else return null;
    }

    public async getElevatorById(elevatorId: ElevatorId | string): Promise<Elevator> {
        const query = { domainId: elevatorId };
        const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

        if (elevatorRecord != null) {
            return ElevatorMap.toDomain(elevatorRecord);
        } else return null;
    }

    public async deleteElevator(elevatorId: ElevatorId | string): Promise<boolean> {
        const query = { domainId: elevatorId };
        const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

        if (elevatorRecord != null) {
            await elevatorRecord.remove();
            return true;
        } else return null;
    }
}
