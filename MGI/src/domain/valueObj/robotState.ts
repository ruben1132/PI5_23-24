import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotStateBrandProps {
    value: boolean;
}

export class RobotState extends ValueObject<RobotStateBrandProps> {
    get value(): boolean {
        return this.props.value;
    }

    set value(value: boolean) {
        this.props.value = value;
    }

    private constructor(props: RobotStateBrandProps) {
        super(props);
    }

    public static create(state: boolean): Result<RobotState> {
        const guardResult = Guard.againstNullOrUndefined(state, 'state');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RobotState>(guardResult.message);
        }

        // check if is valid
        if (state != true && state != false) {
            return Result.fail<RobotState>('Robot state is invalid');
        }

        return Result.ok<RobotState>(new RobotState({ value: state }));
    }
}
