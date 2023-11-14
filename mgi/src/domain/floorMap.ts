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
import { FloorMapSurface } from "./valueObj/floorMapSurface";
import { FloorMapPlayer } from "./floorMapPlayer";
import { FloorMapMaze } from "./valueObj/floorMapMaze";

interface FloorMapProps {
    floor: FloorId; 
    maze: FloorMapMaze; 
    ground: FloorMapSurface;
    wall: FloorMapSurface;
    player: FloorMapPlayer;
    fmDoors: FloorMapDoor[]; 
    fmElevator: FloorMapElevator; 
    fmRooms: FloorMapRoom[];
    fmPassages: FloorMapPassage[];
}

export class FloorMap extends AggregateRoot<FloorMapProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): FloorMapId {
        return new FloorMapId(this.id.toValue());
    }

    get floor(): FloorId {
        return this.props.floor;
    }

    get maze(): FloorMapMaze {
        return this.props.maze;
    }

    get ground(): FloorMapSurface {
        return this.props.ground;
    }

    get wall(): FloorMapSurface {
        return this.props.wall;
    }

    get player(): FloorMapPlayer {
        return this.props.player;
    }

    get fmDoors(): FloorMapDoor[] {
        return this.props.fmDoors;
    }

    get fmElevator(): FloorMapElevator {
        return this.props.fmElevator;
    }

    get fmRooms(): FloorMapRoom[] {
        return this.props.fmRooms;
    }

    get fmPassages(): FloorMapPassage[] {
        return this.props.fmPassages;
    }


    private constructor(props: FloorMapProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {

        const guardedProps = [
            { argument: props.floor, argumentName: 'floor' },
            { argument: props.maze, argumentName: 'maze' },
            { argument: props.ground, argumentName: 'ground' },
            { argument: props.wall, argumentName: 'wall' },
            { argument: props.player, argumentName: 'player' },
            { argument: props.fmDoors, argumentName: 'fmDoors' },
            { argument: props.fmElevator, argumentName: 'fmElevator' },
            { argument: props.fmRooms, argumentName: 'fmRooms' },
            { argument: props.fmPassages, argumentName: 'fmPassages' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMap>(guardResult.message)
        }
        
        const floorMap = new FloorMap({ ...props }, id);
        return Result.ok<FloorMap>(floorMap)

    }
}

