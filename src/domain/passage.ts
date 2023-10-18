import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

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
        const designation = props.designation;
        const fromFloor = props.fromFloor;
        const toFloor = props.toFloor;

        if (!!designation === false || designation.length === 0) {
            return Result.fail<Passage>('Must provide a passage name')
        }
        if (!!fromFloor === false) {
            return Result.fail<Passage>('Must provide a fromFloor')
        }
        if (!!toFloor === false) {
            return Result.fail<Passage>('Must provide a toFloor')
        }
        const role = new Passage({ designation: designation, fromFloor: fromFloor, toFloor: toFloor }, id);
        return Result.ok<Passage>(role)
    }
}
