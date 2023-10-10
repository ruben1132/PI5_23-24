import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BuildingDimensionsProps {
    value: string;
}

export class BuildingDimensions extends ValueObject<BuildingDimensionsProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: BuildingDimensionsProps) {
        super(props);
    }

    public static create(code: string): Result<BuildingDimensions> {
        const regex = /^\d{1,2}x\d{1,2}$/;

        const guardResult = Guard.againstNullOrUndefined(code, 'code');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<BuildingDimensions>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(code)) {
            return Result.fail<BuildingDimensions>("Building dimensions is invalid");
        }

        return Result.ok<BuildingDimensions>(new BuildingDimensions({ value: code }))

    }
}