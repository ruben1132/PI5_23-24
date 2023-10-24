import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { FloorMapPosition } from "./floorMapPosition";
import { PassageId } from "./passageId";

interface FloorMapPassageProps {
    passage: PassageId;
    position: FloorMapPosition;
}

export class FloorMapPassage extends ValueObject<FloorMapPassageProps> {
 
    get passage(): PassageId {
        return this.props.passage;
    }

    set passage(value: PassageId) {
        this.props.passage = value;
    }

    get position(): FloorMapPosition {
        return this.props.position;
    }

    set position(value: FloorMapPosition) {
        this.props.position = value;
    }
    
    private constructor(props: FloorMapPassageProps) {
        super(props);
    }


    public static create(props: FloorMapPassageProps): Result<FloorMapPassage> {
        const guardedProps = [
            { argument: props.passage, argumentName: 'passage' },
            { argument: props.position, argumentName: 'position' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapPassage>(guardResult.message)
        }
        
        return Result.ok<FloorMapPassage>(new FloorMapPassage({ ...props}))

    }
}