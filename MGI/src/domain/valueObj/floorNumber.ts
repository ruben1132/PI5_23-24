import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorNumberProps {
    value: number;
}

export class FloorNumber extends ValueObject<FloorNumberProps> {
    get value(): number {
        return this.props.value;
    }

    set value(value: number) {
        this.props.value = value;
    }

    private constructor(props: FloorNumberProps) {
        super(props);
    }

    public static create(number: number): Result<FloorNumber> {
        const regex = /^[0-9]+$/;

        const guardResult = Guard.againstNullOrUndefined(number, 'number');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<FloorNumber>(guardResult.message);
        }

        const regexNumber = number.toString();
        // check if is valid
        if (!regex.test(regexNumber)) {
            return Result.fail<FloorNumber>("Floor number is invalid");
        }

        return Result.ok<FloorNumber>(new FloorNumber({ value: number }))

    }
}