import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotIdentificationBrandProps {
    value: string;
}

export class RobotIdentification extends ValueObject<RobotIdentificationBrandProps> {

    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: RobotIdentificationBrandProps) {
        super(props);
    }

    public static create(identification: string): Result<RobotIdentification> {
        const regex = /^.{1,30}$/;

        const guardResult = Guard.againstNullOrUndefined(identification, 'identification');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RobotIdentification>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(identification)) {
            return Result.fail<RobotIdentification>('Robot identification is invalid');
        }

        return Result.ok<RobotIdentification>(new RobotIdentification({ value: identification }));
    }

}
