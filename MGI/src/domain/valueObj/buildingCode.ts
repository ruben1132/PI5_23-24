import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BuildingCodeProps {
    value: string;
}

export class BuildingCode extends ValueObject<BuildingCodeProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: BuildingCodeProps) {
        super(props);
    }

    public static create(code: string): Result<BuildingCode> {
        const regex = /^[A-Za-z0-9 ]{1,5}$/;

        const guardResult = Guard.againstNullOrUndefined(code, 'code');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<BuildingCode>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(code)) {
            return Result.fail<BuildingCode>("Building code is invalid");
        }

        return Result.ok<BuildingCode>(new BuildingCode({ value: code }))

    }
}