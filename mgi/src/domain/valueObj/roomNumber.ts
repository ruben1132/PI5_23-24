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
        const regex = /^[A-Za-z]{1,4}\d{0,3}[A-Za-z]?$/;

        const guardResult = Guard.againstNullOrUndefined(number, 'number');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RoomNumber>(guardResult.message);
        }

        if (!regex.test(number)) {
            return Result.fail<RoomNumber>("Room number must be in the format A001 or ABC or ABCD");
        }


        return Result.ok<RoomNumber>(new RoomNumber({ value: number }))

    }
}