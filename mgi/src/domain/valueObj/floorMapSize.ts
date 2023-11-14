import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorMapSizeProps {
    width: number;
    height?: number;
    depth: number;
}

export class FloorMapSize extends ValueObject<FloorMapSizeProps> {
   
    get width(): number {
        return this.props.width;
    }

    set width(value: number) {
        this.props.width = value;
    }

    get height(): number {
        return this.props.height;
    }

    set height(value: number) {
        this.props.height = value;
    }

    get depth(): number {
        return this.props.depth;
    }

    set depth(value: number) {
        this.props.depth = value;
    }

    private constructor(props: FloorMapSizeProps) {
        super(props);
    }

    public static create(props: FloorMapSizeProps): Result<FloorMapSize> {

        const guardedProps = [
            { argument: props.width, argumentName: 'width' },
            { argument: props.depth, argumentName: 'depth' },
          ];
      
          const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
          const guardResult2 = Guard.againstZeroOrNegativeBulk(guardedProps);
      
          if (!guardResult.succeeded || !guardResult2.succeeded) {
            return Result.fail<FloorMapSize>(guardResult.message)
          }    

        return Result.ok<FloorMapSize>(new FloorMapSize({ ...props}))

    }
}