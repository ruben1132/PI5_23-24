import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { IAutonomous } from "./IAutonomous";
import { TaskType } from "./taskType";
import { AutonomousId } from "./valueObj/autonomousId";

// import IDroneDTO from "../dto/IDroneDTO"; // TODO: criar o DTO

interface DroneProps {
    // TODO: 
    state: boolean;
    designation: string;
    taskTypesAllowed: [TaskType]
}

export class Drone extends AggregateRoot<DroneProps> implements IAutonomous {

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

    private constructor(props: DroneProps, id?: UniqueEntityID) {
        super(props, id);
    }


    // TODO: implementar regras de negocio na criacao de uma drone
    //   public static create (droneDTO: IDroneDTO, id?: UniqueEntityID): Result<Drone> {
    //     const designation = droneDTO.designation;

    //     if (!!designation === false || designation.length === 0) {
    //       return Result.fail<Drone>('Must provide a drone name')
    //     } else {
    //       const role = new Drone({ designation: designation }, id);
    //       return Result.ok<Drone>( role )
    //     }
    //   }
}
