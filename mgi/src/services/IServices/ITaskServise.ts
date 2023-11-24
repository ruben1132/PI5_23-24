import { Result } from "../../core/logic/Result";
import {ITaskDTO} from "../../dto/ITaskDTO";

export default interface ITaskService {

  createTask(taskDTO: ITaskDTO): Promise<Result<ITaskDTO>>;
  getTaskById(taskId: string): Promise<Result<ITaskDTO>>;
  updateTask(taskDTO: ITaskDTO): Promise<Result<ITaskDTO>>;
  deleteTask(taskId: string): Promise<Result<void>>;
}
