import { Service, Inject } from 'typedi';
import config from "../../config";
import ITaskTypeDTO from '../dto/ITaskTypeDTO';
import { TaskType } from "../domain/taskType";
import ITaskTypeRepo from './IRepos/ITaskTypeRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import ITaskTypeService from './IServices/ITaskTypeService';
import { Result } from "../core/logic/Result";
import { TaskTypeMap } from "../mappers/TaskTypeMap";
import { Building } from '../domain/building';

@Service()
export default class TaskTypeService implements ITaskTypeService {
    constructor(
        @Inject(config.repos.taskType.name) private taskTypeRepo: ITaskTypeRepo,
    ) { }


    public async createTaskType(taskTypeDTO: ITaskTypeDTO): Promise<Result<ITaskTypeDTO>> {
        try {

            const taskTypeOrError = await TaskType.create({
                name: taskTypeDTO.name,
                description: taskTypeDTO.description,
            });

            if (taskTypeOrError.isFailure) {
                return Result.fail<ITaskTypeDTO>(taskTypeOrError.errorValue());
            }

            const taskTypeResult = taskTypeOrError.getValue();
            await this.taskTypeRepo.save(taskTypeResult);

            const taskTypeDTOResult = TaskTypeMap.toDTO(taskTypeResult);

            return Result.ok<ITaskTypeDTO>(taskTypeDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async getTaskTypes(): Promise<Result<Array<ITaskTypeDTO>>> {
        try {
            const taskTypes = await this.taskTypeRepo.getTaskTypes();

            if (taskTypes === null) {
                return Result.fail<Array<ITaskTypeDTO>>("TaskTypes not found");
            } else {
                const taskTypesDTOResult = taskTypes.map(taskType => TaskTypeMap.toDTO(taskType) as ITaskTypeDTO);
                return Result.ok<Array<ITaskTypeDTO>>(taskTypesDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async updateTaskType(taskTypeDTO: ITaskTypeDTO): Promise<Result<ITaskTypeDTO>> {
        try {
            const taskType = await this.taskTypeRepo.findByDomainId(taskTypeDTO.domainId);

            if (taskType === null) {
                return Result.fail<ITaskTypeDTO>("TaskType not found");
            }

            taskType.name = taskTypeDTO.name;
            taskType.description = taskTypeDTO.description;

            await this.taskTypeRepo.save(taskType);

            const taskTypeDTOResult = TaskTypeMap.toDTO(taskType) as ITaskTypeDTO;

            return Result.ok<ITaskTypeDTO>(taskTypeDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async deleteTaskType(taskTypeId: string): Promise<Result<void>> {
        try {
            const taskType = await this.taskTypeRepo.findByDomainId(taskTypeId);

            if (taskType === null) {
                return Result.fail<void>("TaskType not found");
            }
            else {
                const taskTypes = await this.taskTypeRepo.deleteTaskType(taskTypeId);
                return Result.ok<void>()
            }
        } catch (e) {
            throw e;
        }
    }

}


