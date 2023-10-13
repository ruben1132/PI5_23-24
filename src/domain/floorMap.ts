import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { Elevator } from "./elevator";
import { Floor } from "./floor";
import { Passage } from "./passage";
import { Room } from "./room";
import { FloorMapId } from "./valueObj/floorMapId";
import { Guard } from "../core/logic/Guard";

interface FloorMapProps {
    floor: Floor; //TODO: criar um value obj para intervalo de numeros 
    map: number[][]; //TODO: criar um value obj para designacoes/informacoes (meter um max de chars por exemplo)
    rooms: [Room];
    doors: [Door]; //TODO: create value obj
    elevator: [Elevator]; //TODO: create value obj
    passages: [Passage]; //TODO: create value obj
}

export class FloorMap extends AggregateRoot<FloorMapProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get floorMapId(): FloorMapId {
        return new FloorMapId(this.floorMapId.toValue());
    }

    get floor(): Floor {
        return this.props.floor;
    }

    set floor(value: Floor) {
        this.props.floor = value;
    }

    set map(value: number[][]) {
        this.props.map = value;
    }

    get map(): number[][] {
        return this.props.map;
    }

    get rooms(): [Room] {
        return this.props.rooms;
    }

    set rooms(value: [Room]) {
        this.props.rooms = value;
    }

    get doors(): [Door] {
        return this.props.doors;
    }

    set doors(value: [Door]) {
        this.props.doors = value;
    }

    get elevator(): [Elevator] {
        return this.props.elevator;
    }

    set elevator(value: [Elevator]) {
        this.props.elevator = value;
    }

    get passages(): [Passage] {
        return this.props.passages;
    }

    set passages(value: [Passage]) {
        this.props.passages = value;
    }

    private constructor(props: FloorMapProps, id?: UniqueEntityID) {
        super(props, id);
    }

    // TODO: implementar regras de negocio na criacao de uma floorMap
    public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {

        const guardedProps = [
            { argument: props.floor, argumentName: 'floor' },
            { argument: props.map, argumentName: 'map' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMap>(guardResult.message)
        }

        if (props.map.length === 0) {
            return Result.fail<FloorMap>('Make sure you give a valid map')
        }

        const floorMap = new FloorMap({ ...props }, id);
        return Result.ok<FloorMap>(floorMap)

    }
}
