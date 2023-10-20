import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RoomNumberProps {
    value: string;
}

export class RoomNumber extends ValueObject<RoomNumberProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: RoomNumberProps) {
        super(props);
    }

    public static create(number: string): Result<RoomNumber> {
        const regex = /^.*$/;

        const guardResult = Guard.againstNullOrUndefined(number, 'number');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RoomNumber>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(number)) {
            return Result.fail<RoomNumber>("Room Number is invalid");
        }

        return Result.ok<RoomNumber>(new RoomNumber({ value: number }))

    }
}