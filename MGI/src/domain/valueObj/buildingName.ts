import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BuildingNameProps {
    value: string;
}

export class BuildingName extends ValueObject<BuildingNameProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: BuildingNameProps) {
        super(props);
    }

    public static create(name: string): Result<BuildingName> {
        const regex = /^[A-Za-z0-9 ]+$/i;

        // allows to be null
        if (name === undefined || name === null) {
            return Result.ok<BuildingName>(new BuildingName({ value: "" }));
        }

        // check name length
        if (name.length > 50) {
            return Result.fail<BuildingName>("Building name is invalid");;
        }

        // check if is valid
        if (!regex.test(name)) {
            return Result.fail<BuildingName>("Building name is invalid");
        }

        return Result.ok<BuildingName>(new BuildingName({ value: name }))

    }
}