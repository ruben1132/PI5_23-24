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

    constructor(@Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>) { }

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

    public async save(elevator: Elevator): Promise<Elevator> {
        const query = { domainId: elevator.id.toString() };

        const elevatorDocument = await this.elevatorSchema.findOne(query);

        try {
            if (elevatorDocument === null) {
                const rawElevator: any = ElevatorMap.toPersistence(elevator);
                const elevatorCreated = await this.elevatorSchema.create(rawElevator);

                return ElevatorMap.toDomain(elevatorCreated);
            } else {


                let fAllowed: string[] = [];

                for (const floor of elevator.floorsAllowed) {
                    fAllowed.push(floor.toString());
                }

                elevatorDocument.designation = elevator.elevatorDesignation.value;
                elevatorDocument.floorsAllowed = fAllowed;
                await elevatorDocument.save();

                return elevator;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(elevatorId: ElevatorId | string): Promise<Elevator> {
        try {
            const elevator = await this.elevatorSchema.findOne({ domainId: elevatorId });

            if (elevator) {
                return ElevatorMap.toDomain(elevator);
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    public async findByIds(elevatorIds: ElevatorId[] | string[]): Promise<Elevator[]> {
        try {
            const elevators = await this.elevatorSchema.find({ domainId: { $in: elevatorIds } });

            if (elevators.length > 0) {
                return elevators.map((elevator) => ElevatorMap.toDomain(elevator));
            }

            return [];
        } catch (error) {
            return [];
        }
    }
    public async getElevators(): Promise<Elevator[]> {
        try {
            const elevators = await this.elevatorSchema.find();

            if (elevators.length > 0) {
                return elevators.map((elevator) => ElevatorMap.toDomain(elevator));
            }

            return [];
        } catch (error) {
            // Lide com o erro aqui, se necessário
            return [];
        }
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
