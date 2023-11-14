import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface FloorMapColorMapProps {
    url: string;
}

export class FloorMapColorMap extends ValueObject<FloorMapColorMapProps> {
    get url(): string {
        return this.props.url;
    }

    private constructor(props: FloorMapColorMapProps) {
        super(props);
    }

    public static create(props: FloorMapColorMapProps): Result<FloorMapColorMap> {
        const guardedProps = [{ argument: props.url, argumentName: 'url' }];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result.fail<FloorMapColorMap>(guardResult.message);
        }

        return Result.ok<FloorMapColorMap>(new FloorMapColorMap({ ...props }));
    }
}
