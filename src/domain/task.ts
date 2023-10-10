import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TaskId } from "./valueObj/taskId";
import { TaskType } from "./taskType";
import { Robot } from "./robot";

// import ITaskDTO from "../dto/ITaskDTO"; // TODO: criar o DTO

interface TaskProps {
    designation: string; // TODO: criar um value obj para designacoes (meter um max de chars por exemplo)
    type: TaskType;
    assigned: Robot;
}

export class Task extends AggregateRoot<TaskProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get taskId(): TaskId {
        return new TaskId(this.taskId.toValue());
    }

    get designation(): string {
        return this.props.designation;
    }

    get assigned(): Robot {
        return this.props.assigned;
    }
    
    private constructor(props: TaskProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma task
    //   public static create (taskDTO: ITaskDTO, id?: UniqueEntityID): Result<Task> {
    //     const designation = taskDTO.designation;

    //     if (!!designation === false || designation.length === 0) {
    //       return Result.fail<Task>('Must provide a task name')
    //     } else {
    //       const role = new Task({ designation: designation }, id);
    //       return Result.ok<Task>( role )
    //     }
    //   }
}
