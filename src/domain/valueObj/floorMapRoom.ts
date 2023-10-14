import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Room } from "../room";
import { FloorMapPosition } from "./floorMapPosition";
import { FloorMapDimensions } from "./floorMapDimensions";

interface FloorMapRoomProps {
    room: Room;
    pos: FloorMapPosition;
    dimensions: FloorMapDimensions;
}

export class FloorMapRoom extends ValueObject<FloorMapRoomProps> {
    get room(): Room {
        return this.props.room;
    }

    set room(value: Room) {
        this.props.room = value;
    }

    get pos(): FloorMapPosition {
        return this.props.pos;
    }

    set pos(value: FloorMapPosition) {
        this.props.pos = value;
    }

    get dimensions(): FloorMapDimensions {
        return this.props.dimensions;
    }

    set dimensions(value: FloorMapDimensions) {
        this.props.dimensions = value;
    }

    private constructor(props: FloorMapRoomProps) {
        super(props);
    }

    public static create(props: FloorMapRoomProps): Result<FloorMapRoom> {
        const guardedProps = [
            { argument: props.room, argumentName: 'room' },
            { argument: props.pos, argumentName: 'pos' },
            { argument: props.dimensions, argumentName: 'dimensions' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapRoom>(guardResult.message)
        }

        return Result.ok<FloorMapRoom>(new FloorMapRoom({ ...props }));
    }
}