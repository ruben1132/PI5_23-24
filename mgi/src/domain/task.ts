import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { TaskId } from "./valueObj/taskId";
import { Guard } from "../core/logic/Guard";
import { TaskTypeId } from "./valueObj/taskTypeId";
import { RobotId } from "./valueObj/robotId";

interface TaskProps {
    designation: string; // TODO: criar um value obj para designacoes (meter um max de chars por exemplo)
    type: TaskTypeId;
    assigned: RobotId;
   
}
export class Task extends AggregateRoot<TaskProps> {
    get id(): UniqueEntityID {
        return this._id;
    }
    get taskId(): TaskId {
        return new TaskId(this.id.toValue());
    }
    get designation(): string {
        return this.props.designation;
   
    }
    get assigned(): RobotId {
        return this.props.assigned;
   
    }
    get type(): TaskTypeId {
        return this.props.type;
   
    }
    private constructor(props: TaskProps, id?: UniqueEntityID) {
        super(props, id);
    }
    public static create(props: TaskProps, id?: UniqueEntityID): Result<Task> {
        const guardedProps = [
            { argument: props.designation, argumentName: 'designation' },
            { argument: props.type, argumentName: 'type' },
            { argument: props.assigned, argumentName: 'assigned' }
            
           
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result.fail<Task>(guardResult.message)
        }
        const role = new Task({
            designation: props.designation,
            type: props.type,
            assigned: props.assigned
        }, id);
       
        return Result.ok<Task>(role)
        
    }
}