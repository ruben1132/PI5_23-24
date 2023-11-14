import { ValueObject } from '../core/domain/ValueObject';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';

interface FloorMapPlayerProps {
    initialPosition: [number, number];
    initialDirection: number;
}

export class FloorMapPlayer extends ValueObject<FloorMapPlayerProps> {
    get initialPosition(): [number, number] {
        return this.props.initialPosition;
    }

    get initialDirection(): number {
        return this.props.initialDirection;
    }

    private constructor(props: FloorMapPlayerProps) {
        super(props);
    }

    public static create(props: FloorMapPlayerProps): Result<FloorMapPlayer> {
        const guardedProps = [
            { argument: props.initialPosition, argumentName: 'initialPosition' },
            { argument: props.initialDirection, argumentName: 'initialDirection' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapPlayer>(guardResult.message);
        }

        return Result.ok<FloorMapPlayer>(new FloorMapPlayer({ ...props }));
    }
}
