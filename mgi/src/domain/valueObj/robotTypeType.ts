import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotTypeTypeProps {
    value: string;
}

export class RobotTypeType extends ValueObject<RobotTypeTypeProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: RobotTypeTypeProps) {
        super(props);
    }

    public static create(type: string): Result<RobotTypeType> {
        const regex = /^[A-Za-z0-9]{1,25}$/;

        const guardResult = Guard.againstNullOrUndefined(type, 'type');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RobotTypeType>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(type)) {
            return Result.fail<RobotTypeType>('Robot type is invalid');
        }

        return Result.ok<RobotTypeType>(new RobotTypeType({ value: type }));
    }
}
