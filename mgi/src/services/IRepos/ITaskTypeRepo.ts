import { get } from "lodash";
import { Repo } from "../../core/infra/Repo";
import { TaskType } from "../../domain/taskType";
import { Building } from "../../domain/building";
import { TaskTypeId } from "../../domain/valueObj/taskTypeId";

export default interface ITaskTypeRepo extends Repo<TaskType> {
    save(taskType: TaskType): Promise<TaskType>;
    findByDomainId(taskTypeId: TaskTypeId | string): Promise<TaskType>;
    getTaskTypes(): Promise<TaskType[]>;
    findByIds (passageIds: TaskTypeId[] | string[]): Promise<TaskType[]>;

    deleteTaskType(taskTypeId: string): Promise<Boolean>;

}
