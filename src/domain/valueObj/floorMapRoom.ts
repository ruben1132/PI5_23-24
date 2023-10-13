import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorMapRoomProps {
    value: string;
}

export class FloorMapRoom extends ValueObject<FloorMapRoomProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: FloorMapRoomProps) {
        super(props);
    }

    public static create(name: string): Result<FloorMapRoom> {
        const regex = /^[A-Za-z0-9 ]+$/i;

        // allows to be null
        if (name === undefined || name === null) {
            return Result.ok<FloorMapRoom>(new FloorMapRoom({ value: null }));
        }

        // check name length
        if (name.length > 50) {
            return Result.fail<FloorMapRoom>("Building name is invalid");;
        }

        // check if is valid
        if (!regex.test(name)) {
            return Result.fail<FloorMapRoom>("Building name is invalid");
        }

        return Result.ok<FloorMapRoom>(new FloorMapRoom({ value: name }))

    }
}