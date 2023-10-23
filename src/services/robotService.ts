import { Service, Inject } from 'typedi';
import config from '../../config';
import IRobotDTO from '../dto/IRobotDTO';
import { Robot } from '../domain/robot';
import IRobotRepo from './IRepos/IRobotRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from '../core/logic/Result';
import { RobotMap } from '../mappers/RobotMap';
import { Building } from '../domain/building';

import { RobotIdentification } from '../domain/valueObj/robotIdentification';
import { RobotNickname } from '../domain/valueObj/robotNickname';
import { RobotSerialNumber } from '../domain/valueObj/robotSerialNumber';
import { RobotDescription } from '../domain/valueObj/robotDescription';
import { RobotState } from '../domain/valueObj/robotState';
import { RobotType } from '../domain/robotType';

import { TaskType } from '../domain/taskType';

import ITaskTypeRepo from './IRepos/ITaskTypeRepo';

import { forEach } from 'lodash';
@Service()
export default class RobotService implements IRobotService {
    constructor(
        @Inject(config.repos.robot.name) private robotRepo: IRobotRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
        @Inject(config.repos.taskType.name) private taskTypeRepo: ITaskTypeRepo,
    ) {}

    public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {
            const identification = await RobotIdentification.create(robotDTO.identification);
            if (identification.isFailure) {
                return Result.fail<IRobotDTO>(identification.errorValue());
            }

            const nickname = await RobotNickname.create(robotDTO.nickname);
            if (nickname.isFailure) {
                return Result.fail<IRobotDTO>(nickname.errorValue());
            }


            const type = await RobotType.create(robotDTO.robotType.id as any);
            if (type.isFailure) {
                return Result.fail<IRobotDTO>(type.errorValue());
            }

            const serialNumber = await RobotSerialNumber.create(robotDTO.serialNumber);
            if (serialNumber.isFailure) {
                return Result.fail<IRobotDTO>(serialNumber.errorValue());
            }

            const description = await RobotDescription.create(robotDTO.description);
            if (description.isFailure) {
                return Result.fail<IRobotDTO>(description.errorValue());
            }

            const state = await RobotState.create(robotDTO.state);
            if (state.isFailure) {
                return Result.fail<IRobotDTO>(state.errorValue());
            }

            const robotOrError = await Robot.create({
                identification: identification.getValue(),
                nickname: nickname.getValue(),
                robotType: type.getValue(),
                serialNumber: serialNumber.getValue(),
                description: description.getValue(),
                state: state.getValue(),
            });

            if (robotOrError.isFailure) {
                return Result.fail<IRobotDTO>(robotOrError.errorValue());
            }

            const robotResult = robotOrError.getValue();
            await this.robotRepo.save(robotResult);

            const robotDTOResult = RobotMap.toDTO(robotResult);

            return Result.ok<IRobotDTO>(robotDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async getRobots(): Promise<Result<Array<IRobotDTO>>> {
        try {
            const robots = await this.robotRepo.getRobots();

            if (robots === null) {
                return Result.fail<Array<IRobotDTO>>('Robots not found');
            } else {
                const robotsDTOResult = robots.map(robot => RobotMap.toDTO(robot) as IRobotDTO);
                return Result.ok<Array<IRobotDTO>>(robotsDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {
            const robot = await this.robotRepo.findByDomainId(robotDTO.domainId);

            if (robot === null) {
                return Result.fail<IRobotDTO>('Robot not found');
            }

            const identification = await RobotIdentification.create(robotDTO.identification);
            if (identification.isFailure) {
                return Result.fail<IRobotDTO>(identification.errorValue());
            }

            const nickname = await RobotNickname.create(robotDTO.nickname);
            if (nickname.isFailure) {
                return Result.fail<IRobotDTO>(nickname.errorValue());
            }

            const type = await RobotType.create(robotDTO.robotType.id as any);
            if (type.isFailure) {
                return Result.fail<IRobotDTO>(type.errorValue());
            }

            const serialNumber = await RobotSerialNumber.create(robotDTO.serialNumber);
            if (serialNumber.isFailure) {
                return Result.fail<IRobotDTO>(serialNumber.errorValue());
            }

            const description = await RobotDescription.create(robotDTO.description);
            if (description.isFailure) {
                return Result.fail<IRobotDTO>(description.errorValue());
            }

            const state = await RobotState.create(robotDTO.state);
            if (state.isFailure) {
                return Result.fail<IRobotDTO>(state.errorValue());
            }

            robot.identification = identification.getValue();
            robot.nickname = nickname.getValue();
            robot.robotType = type.getValue();
            robot.serialNumber = serialNumber.getValue();
            robot.description = description.getValue();
            robot.state = state.getValue();

            await this.robotRepo.save(robot);

            const robotDTOResult = RobotMap.toDTO(robot) as IRobotDTO;

            return Result.ok<IRobotDTO>(robotDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async deleteRobot(robotId: string): Promise<Result<void>> {
        try {
            const robot = await this.robotRepo.findByDomainId(robotId);

            if (robot === null) {
                return Result.fail<void>('Robot not found');
            } else {
                const robots = await this.robotRepo.deleteRobot(robotId);
                return Result.ok<void>();
            }
        } catch (e) {
            throw e;
        }
    }
}
