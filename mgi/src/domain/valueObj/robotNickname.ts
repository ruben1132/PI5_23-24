import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotNicknameBrandProps {
    value: string;
}

export class RobotNickname extends ValueObject<RobotNicknameBrandProps> {

    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: RobotNicknameBrandProps) {
        super(props);
    }

    public static create(nickname: string): Result<RobotNickname> {
        const regex = /^.{1,50}$/;

        const guardResult = Guard.againstNullOrUndefined(nickname, 'nickname');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RobotNickname>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(nickname)) {
            return Result.fail<RobotNickname>('Robot nickname is invalid');
        }

        return Result.ok<RobotNickname>(new RobotNickname({ value: nickname }));
    }

}
