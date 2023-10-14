import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { FloorMapDirection } from "./floorMapDirection";

interface FloorMapPositionProps {
    posX: number;
    posY: number;
    direction: FloorMapDirection;
}

export class FloorMapPosition extends ValueObject<FloorMapPositionProps> {
    get posX(): number {
        return this.props.posX;
    }

    set posX(value: number) {
        this.props.posX = value;
    }
    
    get posY(): number {
        return this.props.posY;
    }

    set posY(value: number) {
        this.props.posY = value;
    }

    get direction(): FloorMapDirection {
        return this.props.direction;
    }

    set direction(value: FloorMapDirection) {
        this.props.direction = value;
    }

    private constructor(props: FloorMapPositionProps) {
        super(props);
    }

    public static create(props: FloorMapPositionProps): Result<FloorMapPosition> {

        const guardedProps = [
            { argument: props.posX, argumentName: 'posX' },
            { argument: props.posY, argumentName: 'posY' },
            { argument: props.direction, argumentName: 'direction' },
          ];
      
          const guardResult = Guard.againstZeroOrNegativeBulk(guardedProps);
      
          if (!guardResult.succeeded) {
            return Result.fail<FloorMapPosition>(guardResult.message)
          }    

        return Result.ok<FloorMapPosition>(new FloorMapPosition({ ...props}))

    }
}