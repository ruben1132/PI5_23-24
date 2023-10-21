import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";

import { Result } from "../core/logic/Result";
import { Floor } from "./floor";
import { RoomId } from "./valueObj/roomId";
import { RoomNumber } from "./valueObj/roomNumber";

interface RoomProps {
    number: RoomNumber; 
    floor: Floor;
}

export class Room extends AggregateRoot<RoomProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): RoomId {
        return new RoomId(this.id.toValue());
    }

    get number(): RoomNumber {
        return this.props.number;
    }

    set number(value: RoomNumber) {
        this.props.number = value;
    }

    get floor(): Floor {
        return this.props.floor;
    }

    set floor(value: Floor) {
        this.props.floor = value;
    }
    private constructor(props: RoomProps, domainId?: UniqueEntityID) {
        super(props, domainId);
    }

    public static create(props: RoomProps, domainId?: UniqueEntityID): Result<Room> {
        
        const guardedProps = [
            { argument: props.number, argumentName: 'number' },
            { argument: props.floor, argumentName: 'floor' }
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Room>(guardResult.message)
          }
        const room = new Room({ number: props.number, floor: props.floor }, domainId);
        return Result.ok<Room>(room)
    }
}
