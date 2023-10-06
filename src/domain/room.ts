import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RoomId } from "./valueObj/roomId";

// import IRoomDTO from "../dto/IRoomDTO"; // TODO: criar o DTO

interface RoomProps {
    number: number; //TODO: criar um value obj para intervalo de numeros 
}

export class Room extends AggregateRoot<RoomProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get roomId(): RoomId {
        return new RoomId(this.roomId.toValue());
    }

    get number(): number {
        return this.props.number;
    }

    set number(value: number) {
        this.props.number = value;
    }
    private constructor(props: RoomProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma room
    //   public static create (roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {
    //     const designation = roomDTO.designation;

    //     if (!!designation === false || designation.length === 0) {
    //       return Result.fail<Room>('Must provide a room name')
    //     } else {
    //       const role = new Room({ designation: designation }, id);
    //       return Result.ok<Room>( role )
    //     }
    //   }
}
