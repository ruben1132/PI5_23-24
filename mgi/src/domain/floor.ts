import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { FloorId } from "./valueObj/floorId";

import { FloorInformation } from "./valueObj/floorInformation";
import { Guard } from "../core/logic/Guard";
import { BuildingId } from "./valueObj/buildingId";

interface FloorProps {
    number: number; 
    information: FloorInformation; //TODO: criar um value obj para designacoes/informacoes (meter um max de chars por exemplo)
    building: BuildingId;
    code: string;
}

export class Floor extends AggregateRoot<FloorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): FloorId {
        return new FloorId(this.id.toValue());
    }

    get number(): number {
        return this.props.number;
    }

    set number(value: number) {
        this.props.number = value;
    }

    get information(): FloorInformation {
        return this.props.information;
    }

    set information(value: FloorInformation) {
        this.props.information = value;
    }

    get building(): BuildingId {
        return this.props.building;
    }

    set building(value: BuildingId) {
        this.props.building = value;
    }

    get code(): string {
        return this.props.code;
    }

    set code(value: string) {
        this.props.code = value;
    }

    private constructor(props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> {


        const guardedProps = [
            { argument: props.number, argumentName: 'number' },
            { argument: props.information, argumentName: 'information' },
            { argument: props.building, argumentName: 'building' },
            { argument: props.code, argumentName: 'code' },
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        
        if (!guardResult.succeeded) {
            return Result.fail<Floor>(guardResult.message)
        }

        const floor = new Floor({ number: props.number, information: props.information, building: props.building, code:props.code }, id);
        return Result.ok<Floor>(floor)
    }
}

