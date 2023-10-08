import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { BuildingId } from "./valueObj/buildingId";

import IBuildingDTO from "../dto/IBuildingDTO"; // TODO: criar o DTO

interface BuildingProps {
    designation: string; //TODO: criar um value obj para designacoes/informacoes (meter um max de chars por exemplo)
}

export class Building extends AggregateRoot<BuildingProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get buildingId(): BuildingId {
        return new BuildingId(this.buildingId.toValue());
    }
  
    get designation(): string {
      return this.props.designation;
  }

    private constructor(props: BuildingProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma building
      public static create (buildingDTO: IBuildingDTO, id?: UniqueEntityID): Result<Building> {
        const designation = buildingDTO.designation;

        if (!!designation === false || designation.length === 0) {
          return Result.fail<Building>('Must provide a building name')
        } else {
          const building = new Building({ designation: designation }, id);
          return Result.ok<Building>( building )
        }
      }
}
