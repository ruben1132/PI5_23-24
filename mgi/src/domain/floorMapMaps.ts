import { ValueObject } from '../core/domain/ValueObject';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';
import { FloorMapSize } from './valueObj/floorMapSize';

interface FloorMapMapsProps {
    color: {
        url: string;
    };
    ao: {
        url: string;
        intensity: number;
    };
    displacement: {
        url: string;
        scale: number;
        bias: number;
    };
    normal: {
        url: string;
        type: number;
        scale: {
            x: number;
            y: number;
        };
    };
    bump: {
        url: string;
        scale: number;
    };
    roughness: {
        url: string;
        rough: number;
    };
}

export class FloorMapMaps extends ValueObject<FloorMapMapsProps> {

    get color(): { url: string } {
        return this.props.color;
    }

    set color(value: { url: string }) {
        this.props.color = value;
    }

    set ao(value: { url: string; intensity: number }) {
        this.props.ao = value;
    }

    get ao(): { url: string; intensity: number } {
        return this.props.ao;
    }

    set displacement(value: { url: string; scale: number; bias: number }) {
        this.props.displacement = value;
    }

    get displacement(): { url: string; scale: number; bias: number } {
        return this.props.displacement;
    }

    set normal(value: { url: string; type: number; scale: { x: number; y: number } }) {
        this.props.normal = value;
    }

    get normal(): { url: string; type: number; scale: { x: number; y: number } } {
        return this.props.normal;
    }

    set bump(value: { url: string; scale: number }) {
        this.props.bump = value;
    }

    get bump(): { url: string; scale: number } {
        return this.props.bump;
    }

    set roughness(value: { url: string; rough: number }) {
        this.props.roughness = value;
    }

    get roughness(): { url: string; rough: number } {
        return this.props.roughness;
    }
    
    private constructor(props: FloorMapMapsProps) {
        super(props);
    }

    public static create(props: FloorMapMapsProps): Result<FloorMapMaps> {
        const guard = [
            { argument: props.color, argumentName: 'color' },
            { argument: props.ao, argumentName: 'ao' },
            { argument: props.displacement, argumentName: 'displacement' },
            { argument: props.normal, argumentName: 'normal' },
            { argument: props.bump, argumentName: 'bump' },
            { argument: props.roughness, argumentName: 'roughness' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guard);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapMaps>(guardResult.message);
        }

        return Result.ok<FloorMapMaps>(new FloorMapMaps({ ...props }));
    }
}
