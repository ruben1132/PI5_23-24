import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";

import { Result } from "../core/logic/Result";
import { Floor } from "./floor";
import { PassageId } from "./valueObj/passageId";

interface PassageProps {
    designation: string;
    fromFloor: Floor;
    toFloor: Floor;
}

export class Passage extends AggregateRoot<PassageProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get passageId(): PassageId {
        return new PassageId(this.passageId.toValue());
    }

    get designation(): string {
        return this.props.designation;
    }

    set designation(value: string) {
        this.props.designation = value;
    }

    get fromFloor(): Floor {
        return this.props.fromFloor;
    }

    set fromFloor(value: Floor) {
        this.props.fromFloor = value;
    }

    get toFloor(): Floor {
        return this.props.toFloor;
    }

    set toFloor(value: Floor) {
        this.props.toFloor = value;
    }

    private constructor(props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: PassageProps, id?: UniqueEntityID): Result<Passage> {

        const guardedProps = [
            { argument: props.designation, argumentName: 'designation' },
            { argument: props.fromFloor, argumentName: 'fromFloor' },
            { argument: props.toFloor, argumentName: 'toFloor' },
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Passage>(guardResult.message)
        }

        // doesnt allow to create a passage for the same building
        if (props.fromFloor.building === props.toFloor.building) {
            return Result.fail<Passage>('The passage must be between different buildings')
        }

        const passage = new Passage({ designation: props.designation, fromFloor: props.fromFloor, toFloor: props.toFloor }, id);
        return Result.ok<Passage>(passage)
    }
}
