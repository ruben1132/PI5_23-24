import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { FloorMapMaps } from '../floorMapMaps';
import { FloorMapSize } from './floorMapSize';

interface FloorMapSurfaceProps {
    size?: FloorMapSize;
    segments: FloorMapSize;
    primaryColor: string;
    maps: FloorMapMaps;
    wrapS: number;
    wrapT: number;
    repeat: {
        u: number;
        v: number;
    };
    magFilter: number;
    minFilter: number;
    secondaryColor: string;
}

export class FloorMapSurface extends ValueObject<FloorMapSurfaceProps> {
    get size(): FloorMapSize {
        return this.props.size;
    }

    get segments(): FloorMapSize {
        return this.props.segments;
    }

    get primaryColor(): string {
        return this.props.primaryColor;
    }

    get maps(): FloorMapMaps {
        return this.props.maps;
    }

    get wrapS(): number {
        return this.props.wrapS;
    }

    get wrapT(): number {
        return this.props.wrapT;
    }

    get repeat(): { u: number; v: number } {
        return this.props.repeat;
    }

    get magFilter(): number {
        return this.props.magFilter;
    }

    get minFilter(): number {
        return this.props.minFilter;
    }

    get secondaryColor(): string {
        return this.props.secondaryColor;
    }

    set size(value: FloorMapSize) {
        this.props.size = value;
    }

    set segments(value: FloorMapSize) {
        this.props.segments = value;
    }

    set primaryColor(value: string) {
        this.props.primaryColor = value;
    }

    set maps(value: FloorMapMaps) {
        this.props.maps = value;
    }

    set wrapS(value: number) {
        this.props.wrapS = value;
    }

    set wrapT(value: number) {
        this.props.wrapT = value;
    }

    set repeat(value:  { u: number; v: number }) {
        this.props.repeat = value;
    }

    set magFilter(value: number) {
        this.props.magFilter = value;
    }

    set minFilter(value: number) {
        this.props.minFilter = value;
    }

    set secondaryColor(value: string) {
        this.props.secondaryColor = value;
    }

    private constructor(props: FloorMapSurfaceProps) {
        super(props);
    }

    public static create(props: FloorMapSurfaceProps): Result<FloorMapSurface> {
        const guardedProps = [
            { argument: props.segments, argumentName: 'segments' },
            { argument: props.primaryColor, argumentName: 'primaryColor' },
            { argument: props.maps, argumentName: 'maps' },
            { argument: props.wrapS, argumentName: 'wrapS' },
            { argument: props.wrapT, argumentName: 'wrapT' },
            { argument: props.repeat, argumentName: 'repeat' },
            { argument: props.magFilter, argumentName: 'magFilter' },
            { argument: props.minFilter, argumentName: 'minFilter' },
            { argument: props.secondaryColor, argumentName: 'secondaryColor' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<FloorMapSurface>(guardResult.message);
        }

        return Result.ok<FloorMapSurface>(new FloorMapSurface({ ...props }));
    }
}
