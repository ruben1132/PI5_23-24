import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ElevatorDesignationProps {
    value: string;
}

export class ElevatorDesignation extends ValueObject<ElevatorDesignationProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: ElevatorDesignationProps) {
        super(props);
    }

    public static create(designation: string): Result<ElevatorDesignation> {
        const regex = /^[A-Za-z0-9 ]+$/i;

        // allows to be null
        if (designation === undefined || designation === null) {
            return Result.ok<ElevatorDesignation>(new ElevatorDesignation({ value: "" }));
        }

        // check name length
        if (designation.length > 50) {
            return Result.fail<ElevatorDesignation>("Elevator designation is invalid");;
        }

        // check if is valid
        if (!regex.test(designation)) {
            return Result.fail<ElevatorDesignation>("Elevator designation is invalid");
        }

        return Result.ok<ElevatorDesignation>(new ElevatorDesignation({ value: designation }))

    }
}