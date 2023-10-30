import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotDescriptionBrandProps {
    value: string;
}

export class RobotDescription extends ValueObject<RobotDescriptionBrandProps> {

    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: RobotDescriptionBrandProps) {
        super(props);
    }

    public static create(description: string): Result<RobotDescription> {
        const regex = /^.{1,250}$/;

        const guardResult = Guard.againstNullOrUndefined(description, 'description');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RobotDescription>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(description)) {
            return Result.fail<RobotDescription>('Robot description is invalid');
        }

        return Result.ok<RobotDescription>(new RobotDescription({ value: description }));
    }

}
