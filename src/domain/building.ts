import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { BuildingId } from "./valueObj/buildingId";
import { Guard } from "../core/logic/Guard";

import IBuildingDTO from "../dto/IBuildingDTO"; // TODO: criar o DTO
import { BuildingCode } from "./valueObj/buildingCode";
import { BuildingName } from "./valueObj/buildingName";
import { BuildingDimensions } from "./valueObj/buildingDimensions";

interface BuildingProps {
    code: BuildingCode;
    name: BuildingName;
    dimensions: BuildingDimensions;
}

export class Building extends AggregateRoot<BuildingProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get buildingId(): BuildingId {
        return new BuildingId(this.buildingId.toValue());
    }

    get code(): BuildingCode {
        return this.props.code;
    }

    set code(value: BuildingCode) {
        this.props.code = value;
    }

    get name(): BuildingName {
        return this.props.name;
    }

    set name(value: BuildingName) {
        this.props.name = value;
    }

    get dimensions(): BuildingDimensions {
        return this.props.dimensions;
    }

    set dimensions(value: BuildingDimensions) {
        this.props.dimensions = value;
    }

    private constructor(props: BuildingProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma building
    public static create(props: BuildingProps, id?: UniqueEntityID): Result<Building> {

        const guardedProps = [
            { argument: props.code, argumentName: 'code' },
            { argument: props.dimensions, argumentName: 'dimensions' }
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            console.log(props.code, props.dimensions);
            return Result.fail<Building>(guardResult.message)
        }
        else {
            const building = new Building({
                ...props
            }, id);

            return Result.ok<Building>(building);
        }
    }
}
