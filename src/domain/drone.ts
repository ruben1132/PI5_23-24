import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TaskType } from "./taskType";
import { DroneId } from "./valueObj/droneId";

// import IDroneDTO from "../dto/IDroneDTO"; // TODO: criar o DTO

interface DroneProps {
    // TODO: 
    state: boolean;
    designation: string;
    taskTypesAllowed: [TaskType]
}

export class Drone extends AggregateRoot<DroneProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get droneId(): DroneId {
        return new DroneId(this.droneId.toValue());
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

    get taskTypesAllowed(): [TaskType] {
        return this.props.taskTypesAllowed;
    }

    set taskTypesAllowed(value: [TaskType]) {
        this.props.taskTypesAllowed = value;
    }

    private constructor(props: DroneProps, id?: UniqueEntityID) {
        super(props, id);
    }


    // TODO: implementar regras de negocio na criacao de uma drone
    //   public static create (props: DroneProps, id?: UniqueEntityID): Result<Drone> {
    //     const designation = props.designation;

    //     if (!!designation === false || designation.length === 0) {
    //       return Result.fail<Drone>('Must provide a drone name')
    //     } else {
    //       const role = new Drone({ designation: designation }, id);
    //       return Result.ok<Drone>( role )
    //     }
    //   }
}
