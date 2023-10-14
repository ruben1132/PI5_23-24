import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorMapDirectionProps {
    value: string;
}

export class FloorMapDirection extends ValueObject<FloorMapDirectionProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: FloorMapDirectionProps) {
        super(props);
    }

    public static create(value: string): Result<FloorMapDirection> {

        // check if is null
        if (value == null || value == undefined) {
            return Result.fail<FloorMapDirection>("Direction is invalid");
        }

        // to lower case
        value = value.toLocaleLowerCase();

        // check if is valid
        if (value == "norte" || value == "oeste") {
            return Result.ok<FloorMapDirection>(new FloorMapDirection({ value: value }))
        }

        return Result.fail<FloorMapDirection>("Direction is invalid");


    }
}