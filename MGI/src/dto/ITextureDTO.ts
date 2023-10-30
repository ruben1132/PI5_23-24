export default interface ITextureDTO {
    domainId: string;
    color: {
        textureName: string;
        texture: Buffer;
    };
    ao: {
        textureName: string;
        texture: Buffer;
    };
    displacement: {
        textureName: string;
        texture: Buffer;
    };
    normal: {
        textureName: string;
        texture: Buffer;
    };
    bump: {
        textureName: string;
        texture: Buffer;
    };
    roughness: {
        textureName: string;
        texture: Buffer;
    };

}
