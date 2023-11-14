import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { FloorMapPosition } from "./floorMapPosition";
import { FloorMapSize } from "./floorMapSize";

interface FloorMapMapProps {
    size: FloorMapSize;
    map: number[][];
    position: FloorMapPosition;
    exitLocation: [number, number];
}

export class FloorMapMap extends ValueObject<FloorMapMapProps> {
 
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
    
    private constructor(props: FloorMapMapProps) {
        super(props);
    }


    public static create(props: FloorMapMapProps): Result<FloorMapMap> {
        const guardedProps = [
            { argument: props.size, argumentName: 'size' },
            { argument: props.map, argumentName: 'map' },
            { argument: props.position, argumentName: 'position' },
            { argument: props.exitLocation, argumentName: 'exitLocation' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapMap>(guardResult.message)
        }
        
        return Result.ok<FloorMapMap>(new FloorMapMap({ ...props}))

    }
}