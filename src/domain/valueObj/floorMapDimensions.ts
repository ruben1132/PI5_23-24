import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorMapDimensionsProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class FloorMapDimensions extends ValueObject<FloorMapDimensionsProps> {
  
    get startX(): number {
        return this.props.startX;
    }

    get startY(): number {
        return this.props.startY;
    }

    get endX(): number {
        return this.props.endX;
    }

    get endY(): number {
        return this.props.endY;
    }

    set startX(value: number) {
        this.props.startX = value;
    }

    set startY(value: number) {
        this.props.startY = value;
    }

    set endX(value: number) {
        this.props.endX = value;
    }

    set endY(value: number) {
        this.props.endY = value;
    }

    private constructor(props: FloorMapDimensionsProps) {
        super(props);
    }

    public static create(props: FloorMapDimensionsProps): Result<FloorMapDimensions> {

        const guardedProps = [
            { argument: props.startX, argumentName: 'startX' },
            { argument: props.startY, argumentName: 'startY' },
            { argument: props.endX, argumentName: 'endX' },
            { argument: props.endY, argumentName: 'endY' }
          ];
      
          const guardResult = Guard.againstZeroOrNegativeBulk(guardedProps);
      
          if (!guardResult.succeeded) {
            return Result.fail<FloorMapDimensions>(guardResult.message)
          }    

        return Result.ok<FloorMapDimensions>(new FloorMapDimensions({ ...props}))

    }
}