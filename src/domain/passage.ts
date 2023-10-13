import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { PassageId } from "./valueObj/passageId";

interface PassageProps {
    designation: string;
    fromBuilding: Building;
    toBuilding: Building;
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

    get fromBuilding(): Building {
        return this.props.fromBuilding;
    }

    get toBuilding(): Building {
        return this.props.toBuilding;
    }

    private constructor(props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma passage
    public static create(props: PassageProps, id?: UniqueEntityID): Result<Passage> {
        const designation = props.designation;
        const fromBuilding = props.fromBuilding;
        const toBuilding = props.toBuilding;

        if (!!designation === false || designation.length === 0) {
            return Result.fail<Passage>('Must provide a passage name')
        } else if (!!fromBuilding === false) {
            return Result.fail<Passage>('Must provide a fromBuilding')
        } else if (!!toBuilding === false) {
            return Result.fail<Passage>('Must provide a toBuilding')
        } else {
            const role = new Passage({ designation: designation, fromBuilding: fromBuilding, toBuilding: toBuilding}, id);
            return Result.ok<Passage>(role)
        }
    }
}
