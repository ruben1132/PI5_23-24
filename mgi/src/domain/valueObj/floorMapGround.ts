import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { FloorMapPosition } from "./floorMapPosition";
import { FloorMapSize } from "./floorMapSize";

interface FloorMapGroundProps {
    size: FloorMapSize;
    map: number[][];
    position: FloorMapPosition;
    exitLocation: [number, number];
}

export class FloorMapGround extends ValueObject<FloorMapGroundProps> {
 
    get size(): FloorMapSize {
        return this.props.size;
    }

    set size(value: FloorMapSize) {
        this.props.size = value;
    }

    get passage(): number[][] {
        return this.props.map;
    }

    set passage(value: number[][]) {
        this.props.map = value;
    }

    get position(): FloorMapPosition {
        return this.props.position;
    }

    set position(value: FloorMapPosition) {
        this.props.position = value;
    }
    
    private constructor(props: FloorMapGroundProps) {
        super(props);
    }


    public static create(props: FloorMapGroundProps): Result<FloorMapGround> {
        const guardedProps = [
            { argument: props.size, argumentName: 'size' },
            { argument: props.map, argumentName: 'map' },
            { argument: props.position, argumentName: 'position' },
            { argument: props.exitLocation, argumentName: 'exitLocation' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapGround>(guardResult.message)
        }
        
        return Result.ok<FloorMapGround>(new FloorMapGround({ ...props}))

    }
}