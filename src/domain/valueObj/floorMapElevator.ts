import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { FloorMapPosition } from "./floorMapPosition";
import { Elevator } from "../elevator";

interface FloorMapElevatorProps {
    elevator: Elevator;
    position: FloorMapPosition;
}

export class FloorMapElevator extends ValueObject<FloorMapElevatorProps> {

    get elevator(): Elevator {
        return this.props.elevator;
    }

    set elevator(value: Elevator) {
        this.props.elevator = value;
    }

    get position(): FloorMapPosition {
        return this.props.position;
    }

    set position(value: FloorMapPosition) {
        this.props.position = value;
    }

    private constructor(props: FloorMapElevatorProps) {
        super(props);
    }

    public static create(props: FloorMapElevatorProps): Result<FloorMapElevator> {
        const guardedProps = [
            { argument: props.elevator, argumentName: 'elevator' },
            { argument: props.position, argumentName: 'position' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapElevator>(guardResult.message)
        }
        
        return Result.ok<FloorMapElevator>(new FloorMapElevator({ ...props}))

    }
}