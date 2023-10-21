import { Service, Inject } from 'typedi';

import IRobotTypeRepo from "../services/IRepos/IRobotTypeRepo";
import { RobotType } from "../domain/robotType";
import { Building } from "../domain/building";
import { RobotTypeId } from "../domain/valueObj/robotTypeId";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import { BuildingMap } from "../mappers/BuildingMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';
import { TaskType } from '../domain/taskType';


@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
    private models: any;

    constructor(
        @Inject('robotTypeSchema') private robotTypeSchema: Model<IRobotTypePersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(robotType: RobotType): Promise<boolean> {

        const idX = robotType.id instanceof RobotTypeId ? (<RobotTypeId>robotType.id).toValue() : robotType.id;

        const query = { domainId: idX };
        const robotTypeDocument = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);

        return !!robotTypeDocument === true;
    }

    public async save(robotType: RobotType): Promise<RobotType> {
        const query = { domainId: robotType.id.toString() };

        const robotTypeDocument = await this.robotTypeSchema.findOne(query);

        try {
            if (robotTypeDocument === null) {
                const rawRobotType: any = RobotTypeMap.toPersistence(robotType);

                const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);

                return RobotTypeMap.toDomain(robotTypeCreated);
            } else {

                robotTypeDocument.type = robotType.type.value;
                robotTypeDocument.brand = robotType.brand.value;
                robotTypeDocument.model = robotType.model.value;

                const tasksAllowed = await this.convertArrayToArrayString(robotType.tasksAllowed);
                robotTypeDocument.tasksAllowed = tasksAllowed;

                await robotTypeDocument.save();

                return robotType;
            }
        } catch (err) {
            throw err;
        }
    }

    public async getRobotTypes(): Promise<Array<RobotType>> {
        try {
            const pipeline = [
                {
                    $lookup: {
                        from: 'tasktypes', // Name of the "tasktypes" collection
                        localField: 'tasksAllowed', // Field in the "robotType" collection
                        foreignField: 'domainId', // Field in the "tasktypes" collection
                        as: 'tasksAllowed'
                    },
                  
                },
            ];

            const robotTypesWithTaskTypeData = await this.robotTypeSchema.aggregate(pipeline);

            if (robotTypesWithTaskTypeData) {
                
                const robotTypePromisses = robotTypesWithTaskTypeData.map((robotType) => RobotTypeMap.toDomain(robotType));
                
                return Promise.all(robotTypePromisses);

            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }


    public async findByDomainId(robotTypeId: RobotTypeId | string): Promise<RobotType> {
        const query = { domainId: robotTypeId };

        const robotTypeRecord = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);

        if (robotTypeRecord != null) {
            return RobotTypeMap.toDomain(robotTypeRecord);
        }

        return null;
    }

    public async deleteRobotType(robotTypeId: string): Promise<Boolean> {
        try {
            const query = { domainId: robotTypeId };
            const robotTypeRecord = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);

            if (robotTypeRecord != null) {
                await robotTypeRecord.remove();
                return true;
            }

            return false;
        } catch (err) {
            throw err;
        }
    }

    public async convertArrayToArrayString(array: TaskType[]): Promise<string[]> {

        const arrayString: Array<string> = [];
        array.forEach(element => {
            arrayString.push(element.id.toString());
        });

        return arrayString;
    }
}
