import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface TextureImageProps {
    data: Buffer;
    name: string;
}

export class TextureImage extends ValueObject<TextureImageProps> {
    get data(): Buffer {
        return this.props.data;
    }

    set data(value: Buffer) {
        this.props.data = value;
    }

    get name(): string {
        return this.props.name;
    }

    set name(value: string) {
        this.props.name = value;
    }

    private constructor(props: TextureImageProps) {
        super(props);
    }

    public static create(props: TextureImageProps): Result<TextureImage> {
        const guardedProps = [
            { argument: props.data, argumentName: 'data' },
            { argument: props.name, argumentName: 'name' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        // check if null
        if (!guardResult.succeeded) {
            return Result.fail<TextureImage>(guardResult.message);
        }

        return Result.ok<TextureImage>(new TextureImage({ ...props }));
    }
}
