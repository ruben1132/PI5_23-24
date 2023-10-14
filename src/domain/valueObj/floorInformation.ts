import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface FloorInformationProps {
    value: string;
}

export class FloorInformation extends ValueObject<FloorInformationProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: FloorInformationProps) {
        super(props);
    }

    public static create(information: string): Result<FloorInformation> {
        const regex = /^.*$/;

        const guardResult = Guard.againstNullOrUndefined(information, 'information');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<FloorInformation>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(information)) {
            return Result.fail<FloorInformation>("Floor information is invalid");
        }

        return Result.ok<FloorInformation>(new FloorInformation({ value: information }))

    }
}