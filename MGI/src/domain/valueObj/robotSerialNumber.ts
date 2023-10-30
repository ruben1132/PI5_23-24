import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface RobotSerialNumberBrandProps {
    value: string;
}

export class RobotSerialNumber extends ValueObject<RobotSerialNumberBrandProps> {

    get value(): string {
        return this.props.value;
    }

    set value(value: string) {
        this.props.value = value;
    }

    private constructor(props: RobotSerialNumberBrandProps) {
        super(props);
    }

    public static create(serialNumber: string): Result<RobotSerialNumber> {
        const regex = /^.{1,30}$/;

        const guardResult = Guard.againstNullOrUndefined(serialNumber, 'serialNumber');

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<RobotSerialNumber>(guardResult.message);
        }

        // check if is valid
        if (!regex.test(serialNumber)) {
            return Result.fail<RobotSerialNumber>('Robot serial number is invalid');
        }

        return Result.ok<RobotSerialNumber>(new RobotSerialNumber({ value: serialNumber }));
    }

}
