import { Result } from "../../core/logic/Result";
import ITaskTypeDTO from "../../dto/ITaskTypeDTO";

export default interface ITaskTypeService {

  createTaskType(taskTypeDTO: ITaskTypeDTO): Promise<Result<ITaskTypeDTO>>;
  getTaskTypes (): Promise<Result<Array<ITaskTypeDTO>>>;

  updateTaskType(taskTypeDTO: ITaskTypeDTO): Promise<Result<ITaskTypeDTO>>;
  deleteTaskType(taskTypeId: string): Promise<Result<void>>;
}
