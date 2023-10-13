import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorMapPassageProps {
    value: string;
}

export class FloorMapPassage extends ValueObject<FloorMapPassageProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: FloorMapPassageProps) {
        super(props);
    }

    public static create(name: string): Result<FloorMapPassage> {
        const regex = /^[A-Za-z0-9 ]+$/i;

        // allows to be null
        if (name === undefined || name === null) {
            return Result.ok<FloorMapPassage>(new FloorMapPassage({ value: null }));
        }

        // check name length
        if (name.length > 50) {
            return Result.fail<FloorMapPassage>("Building name is invalid");;
        }

        // check if is valid
        if (!regex.test(name)) {
            return Result.fail<FloorMapPassage>("Building name is invalid");
        }

        return Result.ok<FloorMapPassage>(new FloorMapPassage({ value: name }))

    }
}