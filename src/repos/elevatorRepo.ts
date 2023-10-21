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
                    fAllowed.push(floor.domainId.toString());
                }

                let floorsAllowed: string[];
                elevator.floorsAllowed.forEach(floor => {
                    const floorId = floor.id.toString();
                    floorsAllowed.push(floorId);
                });

                elevatorDocument.designation = elevator.elevatorDesignation.value;
                elevatorDocument.floorsAllowed = floorsAllowed;
                await elevatorDocument.save();

                return elevator;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(elevatorId: ElevatorId | string): Promise<Elevator> {
        try {
            const pipeline = [
                {
                    $match: { domainId: elevatorId } 
                },
                {
                    $lookup: {
                        from: 'floors', // Name of the "tasktypes" collection
                        localField: 'floorsAllowed', // Field in the "robotType" collection
                        foreignField: 'domainId', // Field in the "tasktypes" collection
                        as: 'floorsAllowed'
                    },

                },
            ];

            const elevatorsWithFloorsData = await this.elevatorSchema.aggregate(pipeline);

            if (elevatorsWithFloorsData != null) {
                return ElevatorMap.toDomain(elevatorsWithFloorsData[0]);
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    public async findByIds(elevatorsIds: ElevatorId[] | string[]): Promise<Elevator[]> {
        try {
            const pipeline = [
                {
                    $match: {  domainId: { $in: elevatorsIds }  } 
                },
                {
                    $lookup: {
                        from: 'floors', // Name of the "tasktypes" collection
                        localField: 'floorsAllowed', // Field in the "robotType" collection
                        foreignField: 'domainId', // Field in the "tasktypes" collection
                        as: 'floorsAllowed'
                    },

                },
            ];

            const elevatorsWithFloorsData = await this.elevatorSchema.aggregate(pipeline);

            if (elevatorsWithFloorsData != null) {
                return elevatorsWithFloorsData.map((elevator) => ElevatorMap.toDomain(elevator));
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    public async getElevators(): Promise<Elevator[]> {
        try {
            const pipeline = [
                {
                    $lookup: {
                        from: 'floors', // Name of the "tasktypes" collection
                        localField: 'floorsAllowed', // Field in the "robotType" collection
                        foreignField: 'domainId', // Field in the "tasktypes" collection
                        as: 'floorsAllowed'
                    },

                },
            ];

            const elevatorsWithFloorsData = await this.elevatorSchema.aggregate(pipeline);

            if (elevatorsWithFloorsData != null) {
                return elevatorsWithFloorsData.map((elevator) => ElevatorMap.toDomain(elevator));
            }

            return [];
        } catch (error) {
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
