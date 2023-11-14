import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { FloorMapId } from "./valueObj/floorMapId";
import { FloorMapDoor } from "./valueObj/floorMapDoor";
import { FloorMapElevator } from "./valueObj/floorMapElevator";
import { FloorMapPassage } from "./valueObj/floorMapPassage";
import { FloorMapRoom } from "./valueObj/floorMapRoom";
import { Guard } from "../core/logic/Guard";
import { FloorId } from "./valueObj/floorId";
import { FloorMapMap } from "../mappers/FloorMapMap";

interface FloorMapProps {
    floor: FloorId; 
    map: FloorMapMap; 
    fmRooms: FloorMapRoom[];
    fmDoors: FloorMapDoor[]; 
    fmElevator: FloorMapElevator; 
    fmPassages: FloorMapPassage[];
    wallTexture: string;
    groundTexture: string;
    doorTexture: string;
    elevatorTexture: string;
}

export class FloorMap extends AggregateRoot<FloorMapProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): FloorMapId {
        return new FloorMapId(this.id.toValue());
    }

    set floor(value: FloorId) {
        this.props.floor = value;
    }

    get floor(): FloorId {
        return this.props.floor;
    }

    get map(): FloorMapMap {
        return this.props.map;
    }

    set map(value: FloorMapMap) {
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

    get wallTexture(): string {
        return this.props.wallTexture;
    }

    set wallTexture(value: string) {
        this.props.wallTexture = value;
    }

    get groundTexture(): string {
        return this.props.groundTexture;
    }

    set groundTexture(value: string) {
        this.props.groundTexture = value;
    }

    get doorTexture(): string {
        return this.props.doorTexture;
    }

    set doorTexture(value: string) {
        this.props.doorTexture = value;
    }

    get elevatorTexture(): string {
        return this.props.elevatorTexture;
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
            { argument: props.wallTexture, argumentName: 'wallTexture' },
            { argument: props.groundTexture, argumentName: 'groundTexture' },
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

