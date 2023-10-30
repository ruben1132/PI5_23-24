import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { Result } from '../core/logic/Result';
import { TextureId } from './valueObj/textureId';
import { Guard } from '../core/logic/Guard';
import { TextureImage } from './valueObj/textureImage';

interface TextureProps {
    color: TextureImage;
    ao: TextureImage;
    displacement: TextureImage;
    normal: TextureImage;
    bump: TextureImage;
    roughness: TextureImage;
}

export class Texture extends AggregateRoot<TextureProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get domainId(): TextureId {
        return new TextureId(this.id.toValue());
    }

    set color(value: TextureImage) {
        this.props.color = value;
    }

    get color(): TextureImage {
        return this.props.color;
    }

    set ao(value: TextureImage) {
        this.props.ao = value;
    }

    get ao(): TextureImage {
        return this.props.ao;
    }

    set displacement(value: TextureImage) {
        this.props.displacement = value;
    }

    get displacement(): TextureImage {
        return this.props.displacement;
    }

    set normal(value: TextureImage) {
        this.props.normal = value;
    }

    get normal(): TextureImage {
        return this.props.normal;
    }

    set bump(value: TextureImage) {
        this.props.bump = value;
    }

    get bump(): TextureImage {
        return this.props.bump;
    }

    set roughness(value: TextureImage) {
        this.props.roughness = value;
    }

    get roughness(): TextureImage {
        return this.props.roughness;
    }

    private constructor(props: TextureProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TextureProps, id?: UniqueEntityID): Result<Texture> {
        const guardedProps = [
            { argument: props.color, argumentName: 'color' },
            { argument: props.ao, argumentName: 'ao' },
            { argument: props.displacement, argumentName: 'displacement' },
            { argument: props.normal, argumentName: 'normal' },
            { argument: props.bump, argumentName: 'bump' },
            { argument: props.roughness, argumentName: 'roughness' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Texture>(guardResult.message);
        }

        const role = new Texture(
            {
                ...props,
            },
            id,
        );

        return Result.ok<Texture>(role);
    }
}
