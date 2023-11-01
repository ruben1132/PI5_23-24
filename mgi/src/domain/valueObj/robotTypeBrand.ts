import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotTypeBrandProps {
    value: string;
}

export class RobotTypeBrand extends ValueObject<RobotTypeBrandProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: RobotTypeBrandProps) {
        super(props);
    }

    public static create(brand: string): Result<RobotTypeBrand> {
        const regex = /^.{1,50}$/;

        const guardResult = Guard.againstNullOrUndefined(brand, 'brand');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RobotTypeBrand>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(brand)) {
            return Result.fail<RobotTypeBrand>('Robot brand is invalid');
        }

        return Result.ok<RobotTypeBrand>(new RobotTypeBrand({ value: brand }));
    }
}
