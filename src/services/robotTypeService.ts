import { Service, Inject } from 'typedi';
import config from '../../config';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import { RobotType } from '../domain/robotType';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import IRobotTypeService from './IServices/IRobotTypeService';
import { Result } from '../core/logic/Result';
import { RobotTypeMap } from '../mappers/RobotTypeMap';
import { Building } from '../domain/building';
import { RobotTypeType } from '../domain/valueObj/robotTypeType';
import { RobotTypeBrand } from '../domain/valueObj/robotTypeBrand';
import { RobotTypeModel } from '../domain/valueObj/robotTypeModel';

import { TaskType } from '../domain/taskType';

import ITaskTypeRepo from './IRepos/ITaskTypeRepo';

import { forEach } from 'lodash';
@Service()
export default class RobotTypeService implements IRobotTypeService {
    constructor(
        @Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
        @Inject(config.repos.taskType.name) private taskTypeRepo: ITaskTypeRepo,
    ) { }

    public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
        try {
            const type = await RobotTypeType.create(robotTypeDTO.type);
            if (type.isFailure) {
                return Result.fail<IRobotTypeDTO>(type.errorValue());
            }

            const brand = await RobotTypeBrand.create(robotTypeDTO.brand);
            if (brand.isFailure) {
                return Result.fail<IRobotTypeDTO>(brand.errorValue());
            }

            const model = await RobotTypeModel.create(robotTypeDTO.model);
            if (model.isFailure) {
                return Result.fail<IRobotTypeDTO>(model.errorValue());
            }

            const tasksAllowed = await this.convertToTaskTypeArray(robotTypeDTO.tasksAllowed);

            if (tasksAllowed.isFailure) {
                return Result.fail<IRobotTypeDTO>(tasksAllowed.errorValue());
            }            

            const robotTypeOrError = await RobotType.create({
                type: type.getValue(),
                brand: brand.getValue(),
                model: model.getValue(),
                tasksAllowed: tasksAllowed.getValue(),
            });

            if (robotTypeOrError.isFailure) {
                return Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
            }

            const robotTypeResult = robotTypeOrError.getValue();
            await this.robotTypeRepo.save(robotTypeResult);

            const robotTypeDTOResult = RobotTypeMap.toDTO(robotTypeResult);

            return Result.ok<IRobotTypeDTO>(robotTypeDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async getRobotTypes(): Promise<Result<Array<IRobotTypeDTO>>> {
        try {
            const robotTypes = await this.robotTypeRepo.getRobotTypes();
            
            if (robotTypes === null) {
                return Result.fail<Array<IRobotTypeDTO>>('RobotTypes not found');
            } else {                
                const robotTypesDTOResult = robotTypes.map(robotType => RobotTypeMap.toDTO(robotType) as IRobotTypeDTO);
                return Result.ok<Array<IRobotTypeDTO>>(robotTypesDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async updateRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
        try {
            const robotType = await this.robotTypeRepo.findByDomainId(robotTypeDTO.domainId);

            if (robotType === null) {
                return Result.fail<IRobotTypeDTO>('RobotType not found');
            }

            const type = await RobotTypeType.create(robotTypeDTO.type);
            if (type.isFailure) {
                return Result.fail<IRobotTypeDTO>(type.errorValue());
            }

            const brand = await RobotTypeBrand.create(robotTypeDTO.brand);
            if (brand.isFailure) {
                return Result.fail<IRobotTypeDTO>(brand.errorValue());
            }

            const model = await RobotTypeModel.create(robotTypeDTO.model);
            if (model.isFailure) {
                return Result.fail<IRobotTypeDTO>(model.errorValue());
            }

            robotType.type = type.getValue();
            robotType.brand = brand.getValue();
            robotType.model = model.getValue();
            
            const tasksAllowed = await this.convertToTaskTypeArray(robotTypeDTO.tasksAllowed);

            if (tasksAllowed.isFailure) {
                return Result.fail<IRobotTypeDTO>(tasksAllowed.errorValue());
            }

            robotType.tasksAllowed = tasksAllowed.getValue();

            await this.robotTypeRepo.save(robotType);

            const robotTypeDTOResult = RobotTypeMap.toDTO(robotType) as IRobotTypeDTO;

            return Result.ok<IRobotTypeDTO>(robotTypeDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async deleteRobotType(robotTypeId: string): Promise<Result<void>> {
        try {
            const robotType = await this.robotTypeRepo.findByDomainId(robotTypeId);

            if (robotType === null) {
                return Result.fail<void>('RobotType not found');
            } else {
                const robotTypes = await this.robotTypeRepo.deleteRobotType(robotTypeId);
                return Result.ok<void>();
            }
        } catch (e) {
            throw e;
        }
    }

    private async convertToTaskTypeArray(taskIds: string[]): Promise<Result<TaskType[]>> {
        const taskTypes= [];

        for (const taskId of taskIds) {
            const taskType = await this.taskTypeRepo.findByDomainId(taskId);
            if (taskType === null) {
                return Result.fail<TaskType[]>(`TaskType ${taskId} not found`);
            }
            taskTypes.push(taskType);
        }

        return Result.ok<TaskType[]>(taskTypes);
    }
}
