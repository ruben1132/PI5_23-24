import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Floor } from "./floor";
import { RoomId } from "./valueObj/roomId";
import { RoomNumber } from "./valueObj/roomNumber";

interface RoomProps {
    number: RoomNumber; 
    floor: Floor;
}

export class Room extends AggregateRoot<RoomProps> {
    get domainId(): UniqueEntityID {
        return this._id;
    }

    get roomDomainId(): RoomId {
        return new RoomId(this.roomDomainId.toValue());
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
        
        const number = props.number;
        const floor = props.floor;

        if (!!number === false || number === null) {
            return Result.fail<Room>('Must provide a room number')
        }
        if (!!floor === false || floor === null) {
            return Result.fail<Room>('Must provide a floor')
        }
        
        const room = new Room({ number: number, floor: floor }, domainId);
        return Result.ok<Room>(room)
    }
}
