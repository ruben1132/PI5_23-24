import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { FloorId } from "./valueObj/floorId";



// import IFloorDTO from "../dto/IFloorDTO"; // TODO: criar o DTO

interface FloorProps {
    number: number; //TODO: criar um value obj para intervalo de numeros 
    information: string; //TODO: criar um value obj para designacoes/informacoes (meter um max de chars por exemplo)
    building: Building;
}

export class Floor extends AggregateRoot<FloorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get floorId(): FloorId {
        return new FloorId(this.floorId.toValue());
    }

    get number(): number {
        return this.props.number;
    }

    set number(value: number) {
        this.props.number = value;
    }

    get information(): string {
        return this.props.information;
    }

    set information(value: string) {
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

        if (!!number === false || number === 0) {
            return Result.fail<Floor>('Must provide a floor number')
        } else if (!!information === false || information === '') {
            return Result.fail<Floor>('Must provide a floor information')
        } else if (!!building === false || building === null) {
            return Result.fail<Floor>('Must provide a building')
        } else {
            const floor = new Floor({ number: number, information: information, building: building }, id);
            return Result.ok<Floor>(floor)
        }
    }
}
