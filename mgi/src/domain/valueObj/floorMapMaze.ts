import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { FloorMapPosition } from "./floorMapPosition";
import { FloorMapSize } from "./floorMapSize";

interface FloorMapMapProps {
    size: FloorMapSize;
    map: number[][];
    exitLocation: [number, number];
}

export class FloorMapMaze extends ValueObject<FloorMapMapProps> {
 
    get size(): FloorMapSize {
        return this.props.size;
    }

    set size(value: FloorMapSize) {
        this.props.size = value;
    }

    get map(): number[][] {
        return this.props.map;
    }

    set map(value: number[][]) {
        this.props.map = value;
    }

    get exitLocation(): [number, number] {
        return this.props.exitLocation;
    }

    set exitLocation(value: [number, number]) {
        this.props.exitLocation = value;
    }
    
    private constructor(props: FloorMapMapProps) {
        super(props);
    }


    public static create(props: FloorMapMapProps): Result<FloorMapMaze> {
        const guardedProps = [
            { argument: props.size, argumentName: 'size' },
            { argument: props.map, argumentName: 'map' },
            { argument: props.exitLocation, argumentName: 'exitLocation' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapMaze>(guardResult.message)
        }
        
        return Result.ok<FloorMapMaze>(new FloorMapMaze({ ...props}))

    }
}