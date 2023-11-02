import { Service, Inject } from 'typedi';

import IRobotRepo from '../services/IRepos/IRobotRepo';
import { Robot } from '../domain/robot';
import { RobotId } from '../domain/valueObj/robotId';
import { RobotMap } from '../mappers/RobotMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

@Service()
export default class RobotRepo implements IRobotRepo {
    private models: any;

    constructor(@Inject('robotSchema') private robotSchema: Model<IRobotPersistence & Document>) { }

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(robot: Robot): Promise<boolean> {
        const idX = robot.id instanceof RobotId ? (<RobotId>robot.id).toValue() : robot.id;

        const query = { domainId: idX };
        const robotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);

        return !!robotDocument === true;
    }

    public async save(robot: Robot): Promise<Robot> {
        const query = { domainId: robot.id.toString() };

        const robotDocument = await this.robotSchema.findOne(query);

        try {
            if (robotDocument === null) {
                const rawRobot: any = RobotMap.toPersistence(robot);

                const robotCreated = await this.robotSchema.create(rawRobot);

                return RobotMap.toDomain(robotCreated);
            } else {

                robotDocument.identification = robot.identification.value;
                robotDocument.nickname = robot.nickname.value;
                robotDocument.robotType = robot.robotType.toString();
                robotDocument.serialNumber = robot.serialNumber.value;
                robotDocument.description = robot.description.value;
                robotDocument.state = robot.state.value;

                await robotDocument.save();

                return robot;
            }
        } catch (err) {
            throw err;
        }
    }

    public async getRobots(): Promise<Robot[]> {
        try {
            const robots = await this.robotSchema.find({});

            if (robots) {
                return robots.map((passage) => RobotMap.toDomain(passage));
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }

    public async findByDomainId(robotId: RobotId | string): Promise<Robot> {
        try {
            const robot = await this.robotSchema.findOne({ domainId: robotId });


            if (robot != null) {
                return RobotMap.toDomain(robot);
            }

            return null;

        } catch (error) {
            return null;
        }
    }

    public async deleteRobot(robotId: string): Promise<boolean> {
        try {

            // console.log('robotId', robotId);
            const query = { domainId: robotId };
            const robotRecord = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);

            if (robotRecord != null) {
                await robotRecord.remove();
                return true;
            }

            return false;
        } catch (err) {
            throw err;
        }
    }
}