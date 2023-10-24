import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";

import { Result } from "../core/logic/Result";
import { Floor } from "./floor";
import { FloorId } from "./valueObj/floorId";
import { PassageId } from "./valueObj/passageId";

interface PassageProps {
    designation: string;
    fromFloor: FloorId;
    toFloor: FloorId;
}

export class Passage extends AggregateRoot<PassageProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): PassageId {
        return new PassageId(this.id.toValue());
    }

    get designation(): string {
        return this.props.designation;
    }

    set designation(value: string) {
        this.props.designation = value;
    }

    get fromFloor(): FloorId {
        return this.props.fromFloor;
    }

    set fromFloor(value: FloorId) {
        this.props.fromFloor = value;
    }

    get toFloor(): FloorId {
        return this.props.toFloor;
    }

    set toFloor(value: FloorId) {
        this.props.toFloor = value;
    }

    private constructor(props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(propss: PassageProps, id?: UniqueEntityID): Result<Passage> {

        const guardedProps = [
            { argument: propss.designation, argumentName: 'designation' },
            { argument: propss.fromFloor, argumentName: 'fromFloor' },
            { argument: propss.toFloor, argumentName: 'toFloor' },
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Passage>(guardResult.message)
        }

        // doesnt allow to create a passage for the same floor
        if (propss.fromFloor === propss.toFloor) {
            return Result.fail<Passage>('The passage must be between different floors and buildings')
        }

        const passage = new Passage({ designation: propss.designation, fromFloor: propss.fromFloor, toFloor: propss.toFloor }, id);
        return Result.ok<Passage>(passage)
    }
}
