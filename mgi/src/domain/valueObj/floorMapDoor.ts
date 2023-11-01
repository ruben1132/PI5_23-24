import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { FloorMapPosition } from "./floorMapPosition";

interface FloorMapDoorProps {
    position: FloorMapPosition;
}

export class FloorMapDoor extends ValueObject<FloorMapDoorProps> {

    get position(): FloorMapPosition {
        return this.props.position;
    }

    set position(value: FloorMapPosition) {
        this.props.position = value;
    }

    private constructor(props: FloorMapDoorProps) {
        super(props);
    }

    public static create(props: FloorMapDoorProps): Result<FloorMapDoor> {

        const guardedProps = [
            { argument: props.position, argumentName: 'position' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapDoor>(guardResult.message)
        }
        
        return Result.ok<FloorMapDoor>(new FloorMapDoor({ ...props}))
    }
}