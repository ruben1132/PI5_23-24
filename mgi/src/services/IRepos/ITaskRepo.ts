import { Repo } from "../../core/infra/Repo";
import { Task } from "../../domain/task";
import { TaskId } from "../../domain/valueObj/taskId";

export default interface ITaskRepo extends Repo<Task> {
  save(task: Task): Promise<Task>;
  findByDomainId (taskId: TaskId | string): Promise<Task>;

  gettask (): Promise<Task[]>;
  deleteTask(taskId: TaskId | string): Promise<boolean>;

  findByIds (taskIds: TaskId[] | string[]): Promise<Task[]>;
  getTaskById (taskId: string): Promise<Task>;
}
