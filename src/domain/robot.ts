import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { IAutonomous } from "./IAutonomous";
import { TaskType } from "./taskType";
import { AutonomousId } from "./valueObj/autonomousId";

// import IRobotDTO from "../dto/IRobotDTO"; // TODO: criar o DTO

interface RobotProps {
   // TODO: 
    state: boolean;
    designation: string;
    taskTypesAllowed: [TaskType]
}

export class Robot extends AggregateRoot<RobotProps> implements IAutonomous {

    get id(): UniqueEntityID {
        return this._id;
    }

    get autonomousId(): AutonomousId {
        return new AutonomousId(this.autonomousId.toValue());
    }

    get designation(): string {
        return this.designation;
    }

    set designation(value: string) {
        this.designation = value;
    }

    get state(): boolean {
        return this.state;
    }

    set state(value: boolean) {
        this.state = value;
    }
    
    get taskTypesAllowed(): [TaskType] {
        return this.taskTypesAllowed;
    }

    set taskTypesAllowed(value: [TaskType]) {
        this.taskTypesAllowed = value;
    }

    private constructor(props: RobotProps, id?: UniqueEntityID) {
        super(props, id);
    }
    

    // TODO: implementar regras de negocio na criacao de uma robot
    //   public static create (robotDTO: IRobotDTO, id?: UniqueEntityID): Result<Robot> {
    //     const designation = robotDTO.designation;

    //     if (!!designation === false || designation.length === 0) {
    //       return Result.fail<Robot>('Must provide a robot name')
    //     } else {
    //       const role = new Robot({ designation: designation }, id);
    //       return Result.ok<Robot>( role )
    //     }
    //   }
}
        