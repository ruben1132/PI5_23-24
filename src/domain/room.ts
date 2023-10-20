import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";

import { Result } from "../core/logic/Result";
import { Floor } from "./floor";
import { RoomId } from "./valueObj/roomId";

interface RoomProps {
    number: number; 
    floor: Floor;
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

    get floor(): Floor {
        return this.props.floor;
    }

    private constructor(props: RoomProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma room
    public static create(props: RoomProps, id?: UniqueEntityID): Result<Room> {
        const guardedProps = [
            { argument: props.number, argumentName: 'number' },
            { argument: props.floor, argumentName: 'floor' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Room>(guardResult.message)
        }

        return Result.ok<Room>(new Room({ ...props }, id))
    }
}
