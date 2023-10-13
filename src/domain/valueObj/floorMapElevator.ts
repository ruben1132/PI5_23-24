import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorMapElevatorProps {
    value: string;
}

export class FloorMapElevator extends ValueObject<FloorMapElevatorProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: FloorMapElevatorProps) {
        super(props);
    }

    public static create(name: string): Result<FloorMapElevator> {
        const regex = /^[A-Za-z0-9 ]+$/i;

        // allows to be null
        if (name === undefined || name === null) {
            return Result.ok<FloorMapElevator>(new FloorMapElevator({ value: null }));
        }

        // check name length
        if (name.length > 50) {
            return Result.fail<FloorMapElevator>("Building name is invalid");;
        }

        // check if is valid
        if (!regex.test(name)) {
            return Result.fail<FloorMapElevator>("Building name is invalid");
        }

        return Result.ok<FloorMapElevator>(new FloorMapElevator({ value: name }))

    }
}