import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";

import { Result } from "../core/logic/Result";
import { TaskType } from "./taskType";
import { RobotId } from "./valueObj/robotId";

interface RobotProps {
   // TODO: 
    state: boolean;
    designation: string;
    taskTypesAllowed: TaskType[]
}

export class Robot extends AggregateRoot<RobotProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get robotId(): RobotId {
        return new RobotId(this.robotId.toValue());
    }

    get designation(): string {
        return this.props.designation;
    }

    set designation(value: string) {
        this.props.designation = value;
    }

    get state(): boolean {
        return this.props.state;
    }

    set state(value: boolean) {
        this.props.state = value;
    }
    
    get taskTypesAllowed():  TaskType[] {
        return this.props.taskTypesAllowed;
    }

    set taskTypesAllowed(value:  TaskType[]) {
        this.props.taskTypesAllowed = value;
    }

    private constructor(props: RobotProps, id?: UniqueEntityID) {
        super(props, id);
    }
    

      public static create (props: RobotProps, id?: UniqueEntityID): Result<Robot> {
        const guardedProps = [
            { argument: props.state, argumentName: 'state' },
            { argument: props.designation, argumentName: 'designation' },
            { argument: props.taskTypesAllowed, argumentName: 'taskTypesAllowed' },
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Robot>(guardResult.message)
          }

          const robot = new Robot({...props}, id);
          return Result.ok<Robot>( robot )
      }
}


        