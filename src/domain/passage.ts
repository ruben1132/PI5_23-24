import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PassageId } from "./valueObj/passageId";

// import IPassageDTO from "../dto/IPassageDTO"; // TODO: criar o DTO

interface PassageProps {
    designation: string; // TODO: criar um value obj para designacoes (meter um max de chars por exemplo)
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
    private constructor(props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma passage
    //   public static create (passageDTO: IPassageDTO, id?: UniqueEntityID): Result<Passage> {
    //     const designation = passageDTO.designation;

    //     if (!!designation === false || designation.length === 0) {
    //       return Result.fail<Passage>('Must provide a passage name')
    //     } else {
    //       const role = new Passage({ designation: designation }, id);
    //       return Result.ok<Passage>( role )
    //     }
    //   }
}
