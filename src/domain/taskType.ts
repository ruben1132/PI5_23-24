import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

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

    get taskTypeId(): TaskTypeId {
        return new TaskTypeId(this.taskTypeId.toValue());
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

    public static create(TaskTypeProps: TaskTypeProps, id?: UniqueEntityID): Result<TaskType> {
        const name = TaskTypeProps.name;
        const description = TaskTypeProps.description;

        if (!!name === false || name.length === 0) {
            return Result.fail<TaskType>('Must provide a task type name');
        } else if (!!description === false || description.length === 0) {
            return Result.fail<TaskType>('Must provide a task type description');
        } else {
            const taskType = new TaskType({ name: name, description: description }, id);
            return Result.ok<TaskType>(taskType);
        }
    }
}
