import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { FloorId } from "./valueObj/floorId";

import { FloorNumber } from "./valueObj/floorNumber";
import { FloorInformation } from "./valueObj/floorInformation";



// import IFloorDTO from "../dto/IFloorDTO"; // TODO: criar o DTO

interface FloorProps {
    number: FloorNumber; //TODO: criar um value obj para intervalo de numeros 
    information: FloorInformation; //TODO: criar um value obj para designacoes/informacoes (meter um max de chars por exemplo)
    building: Building;
}

export class Floor extends AggregateRoot<FloorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get floorId(): FloorId {
        return new FloorId(this.floorId.toValue());
    }

    get number(): FloorNumber {
        return this.props.number;
    }

    set number(value: FloorNumber) {
        this.props.number = value;
    }

    get information(): FloorInformation {
        return this.props.information;
    }

    set information(value: FloorInformation) {
        this.props.information = value;
    }

    get building(): Building {
        return this.props.building;
    }

    set building(value: Building) {
        this.props.building = value;
    }

    private constructor(props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma floor
    public static create(props: FloorProps, id?: UniqueEntityID): Result<Floor> {
        const number = props.number;
        const information = props.information;
        const building = props.building;

        if (!!number === false || number === null) {
            return Result.fail<Floor>('Must provide a floor number')
        }
        if (!!information === false || information === null) {
            return Result.fail<Floor>('Must provide a floor information')
        }
        if (!!building === false || building === null) {
            return Result.fail<Floor>('Must provide a building')
        }
        
        const floor = new Floor({ number: number, information: information, building: building }, id);
        return Result.ok<Floor>(floor)
    }
}
