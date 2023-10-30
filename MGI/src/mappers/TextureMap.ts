import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { ITexturePersistence } from '../dataschema/ITexturePersistence';

import ITextureDTO from '../dto/ITextureDTO';
import { Texture } from '../domain/texture';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { TextureImage } from '../domain/valueObj/textureImage';

export class TextureMap extends Mapper<Texture> {
    public static toDTO(texture: Texture): ITextureDTO {
        return {
            domainId: texture.id.toString(),
            color: {
                textureName: texture.color.name,
                texture: texture.color.data,
            },
            ao: {
                textureName: texture.ao.name,
                texture: texture.ao.data,
            },
            displacement: {
                textureName: texture.displacement.name,
                texture: texture.displacement.data,
            },
            normal: {
                textureName: texture.normal.name,
                texture: texture.normal.data,
            },
            bump: {
                textureName: texture.bump.name,
                texture: texture.bump.data,
            },
            roughness: {
                textureName: texture.roughness.name,
                texture: texture.roughness.data,
            },
        } as ITextureDTO;
    }

    public static toDomain(texture: any | Model<ITexturePersistence & Document>): Texture {
        const color = TextureImage.create({ data: texture.color.texture, name: texture.color.textureName }).getValue();
        const ao = TextureImage.create({ data: texture.ao.texture, name: texture.ao.textureName }).getValue();
        const displacement = TextureImage.create({ data: texture.displacement.texture, name: texture.displacement.textureName }).getValue();
        const normal = TextureImage.create({ data: texture.normal.texture, name: texture.normal.textureName }).getValue();
        const bump =  TextureImage.create({ data: texture.bump.texture, name: texture.bump.textureName }).getValue();
        const roughness = TextureImage.create({ data: texture.roughness.texture, name: texture.roughness.textureName }).getValue();

        const textureOrError = Texture.create(
            {
                color: color,
                ao: ao,
                displacement: displacement,
                normal: normal,
                bump: bump,
                roughness: roughness,
            },
            new UniqueEntityID(texture.domainId),
        );

        textureOrError.isFailure ? console.log(textureOrError.error) : '';

        return textureOrError.isSuccess ? textureOrError.getValue() : null;
    }

    public static toPersistence(texture: Texture): any {
        return {
            domainId: texture.domainId.toString(),
            color: {
                textureName: texture.color.name,
                texture: texture.color.data,
            },
            ao: {
                textureName: texture.ao.name,
                texture: texture.ao.data,
            },
            displacement: {
                textureName: texture.displacement.name,
                texture: texture.displacement.data,
            },
            normal: {
                textureName: texture.normal.name,
                texture: texture.normal.data,
            },
            bump: {
                textureName: texture.bump.name,
                texture: texture.bump.data,
            },
            roughness: {
                textureName: texture.roughness.name,
                texture: texture.roughness.data,
            },
        };
    }
}
