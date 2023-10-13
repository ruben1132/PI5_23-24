import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TaskTypeId } from "./valueObj/taskTypeId";

interface TaskTypeProps {
  name: string;
}

export class TaskType extends AggregateRoot<TaskTypeProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get taskTypeId (): TaskTypeId {
    return new TaskTypeId(this.taskTypeId.toValue());
  }

  get name (): string {
    return this.props.name;
  }

  set name ( value: string) {
    this.props.name = value;
  }
  private constructor (props: TaskTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

//   public static create (TaskTypeProps: ITaskTypeDTO, id?: UniqueEntityID): Result<TaskType> {
//     const name = props.name;

//     if (!!name === false || name.length === 0) {
//       return Result.fail<TaskType>('Must provide a taskType name')
//     } else {
//       const taskType = new TaskType({ name: name }, id);
//       return Result.ok<TaskType>( taskType )
//     }
//   }
}
