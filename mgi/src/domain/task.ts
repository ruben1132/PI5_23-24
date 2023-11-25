import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TaskId } from "./valueObj/taskId";
import { Guard } from "../core/logic/Guard";



interface TaskProps {
    id: string;
    initialType: string;
    finalType : string;
    path : string;
}

export class Task extends AggregateRoot<TaskProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): TaskId {
        return new TaskId(this.id.toValue());
    }

    get initialType(): string {
        return this.props.initialType;
    }

    get finalType(): string {
        return this.props.finalType;
    }

    get path(): string {
        return this.props.path;
    }

    private constructor(props: TaskProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TaskProps, id?: UniqueEntityID): Result<Task> {

        const guardedProps = [
            { argument: props.initialType, argumentName: 'initialType' },
            { argument: props.finalType, argumentName: 'finalType' },
           
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Task>(guardResult.message)
        }

        const task = new Task({id : props.id,initialType: props.initialType,
            finalType: props.finalType,path : props.path});

        return Result.ok<Task>(task)

    }
}
