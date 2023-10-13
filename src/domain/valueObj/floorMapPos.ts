import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorMapPosProps {
    posX: number;
    posY: number;
}

export class FloorMapPos extends ValueObject<FloorMapPosProps> {
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

    private constructor(props: FloorMapPosProps) {
        super(props);
    }

    public static create(props: FloorMapPos): Result<FloorMapPos> {

        // allows to be null
        if (name === undefined || name === null) {
            return Result.ok<FloorMapPos>(new FloorMapPos({ value: null }));
        }

        // check name length
        if (name.length > 50) {
            return Result.fail<FloorMapPos>("Building name is invalid");;
        }

        // check if is valid
        if (!regex.test(name)) {
            return Result.fail<FloorMapPos>("Building name is invalid");
        }

        return Result.ok<FloorMapPos>(new FloorMapPos({ value: name }))

    }
}