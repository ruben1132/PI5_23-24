import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotTypeModelProps {
    value: string;
}

export class RobotTypeModel extends ValueObject<RobotTypeModelProps> {
    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: RobotTypeModelProps) {
        super(props);
    }

    public static create(model: string): Result<RobotTypeModel> {
        const regex = /^.{1,100}$/;

        const guardResult = Guard.againstNullOrUndefined(model, 'model');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RobotTypeModel>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(model)) {
            return Result.fail<RobotTypeModel>('Robot model is invalid');
        }

        return Result.ok<RobotTypeModel>(new RobotTypeModel({ value: model }));
    }
}
