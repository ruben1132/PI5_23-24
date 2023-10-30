import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Guard } from '../core/logic/Guard';

import { Result } from '../core/logic/Result';
import { TaskTypeId } from './valueObj/taskTypeId';

interface TaskTypeProps {
    name: string;
    description: string;
}

export class TaskType extends AggregateRoot<TaskTypeProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): TaskTypeId {
        return new TaskTypeId(this.id.toValue());
    }

    get name(): string {
        return this.props.name;
    }

    set name(value: string) {
        this.props.name = value;
    }

    get description(): string {
        return this.props.description;
    }

    set description(value: string) {
        this.props.description = value;
    }

    private constructor(props: TaskTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TaskTypeProps, id?: UniqueEntityID): Result<TaskType> {
        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.description, argumentName: 'description' }
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        const guardResult2 = Guard.againstEmptyBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<TaskType>(guardResult.message)
        }
        if (!guardResult2.succeeded) {
            return Result.fail<TaskType>(guardResult2.message)
        }
        
        const taskType = new TaskType({ name: props.name, description: props.description }, id);
        return Result.ok<TaskType>(taskType);

    }
}
