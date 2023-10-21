import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { Floor } from "./floor";
import { FloorMapId } from "./valueObj/floorMapId";
import { FloorMapDoor } from "./valueObj/floorMapDoor";
import { FloorMapElevator } from "./valueObj/floorMapElevator";
import { FloorMapPassage } from "./valueObj/floorMapPassage";
import { FloorMapRoom } from "./valueObj/floorMapRoom";
import { Guard } from "../core/logic/Guard";

interface FloorMapProps {
    floor: Floor; 
    map: number[][]; 
    fmRooms: FloorMapRoom[];
    fmDoors: FloorMapDoor[]; 
    fmElevator: FloorMapElevator; 
    fmPassages: FloorMapPassage[];
}

export class FloorMap extends AggregateRoot<FloorMapProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get floorMapId(): FloorMapId {
        return new FloorMapId(this.id.toValue());
    }

    set floor(value: Floor) {
        this.props.floor = value;
    }

    get floor(): Floor {
        return this.props.floor;
    }

    get map(): number[][] {
        return this.props.map;
    }

    set map(value: number[][]) {
        this.props.map = value;
    }

    get fmRooms(): FloorMapRoom[] {
        return this.props.fmRooms;
    }

    set fmRooms(value: FloorMapRoom[]) {
        this.props.fmRooms = value;
    }

    get fmDoors(): FloorMapDoor[] {
        return this.props.fmDoors;
    }

    set fmDoors(value: FloorMapDoor[]) {
        this.props.fmDoors = value;
    }

    get fmElevator(): FloorMapElevator {
        return this.props.fmElevator;
    }

    set fmElevator(value: FloorMapElevator) {
        this.props.fmElevator = value;
    }

    get fmPassages(): FloorMapPassage[] {
        return this.props.fmPassages;
    }

    set fmPassages(value: FloorMapPassage[]) {
        this.props.fmPassages = value;
    }

    private constructor(props: FloorMapProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {

        const guardedProps = [
            { argument: props.floor, argumentName: 'floor' },
            { argument: props.map, argumentName: 'map' },
            { argument: props.fmRooms, argumentName: 'fmRooms' },
            { argument: props.fmDoors, argumentName: 'fmDoors' },
            { argument: props.fmElevator, argumentName: 'fmElevator' },
            { argument: props.fmPassages, argumentName: 'fmPassages' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMap>(guardResult.message)
        }

        if (props.map.length === 0) {
            return Result.fail<FloorMap>("Map is empty")
        }
        
        const floorMap = new FloorMap({ ...props }, id);
        return Result.ok<FloorMap>(floorMap)

    }
}

