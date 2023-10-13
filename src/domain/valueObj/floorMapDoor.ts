import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorMapDoorProps {
    value: string;
}

export class FloorMapDoor extends ValueObject<FloorMapDoorProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: FloorMapDoorProps) {
        super(props);
    }

    public static create(name: string): Result<FloorMapDoor> {
        const regex = /^[A-Za-z0-9 ]+$/i;

        // allows to be null
        if (name === undefined || name === null) {
            return Result.ok<FloorMapDoor>(new FloorMapDoor({ value: null }));
        }

        // check name length
        if (name.length > 50) {
            return Result.fail<FloorMapDoor>("Building name is invalid");;
        }

        // check if is valid
        if (!regex.test(name)) {
            return Result.fail<FloorMapDoor>("Building name is invalid");
        }

        return Result.ok<FloorMapDoor>(new FloorMapDoor({ value: name }))

    }
}