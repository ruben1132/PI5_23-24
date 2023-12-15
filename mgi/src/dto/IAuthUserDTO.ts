export interface IAuthUserDTO {
    id: string;
    email: string;
    name: string;
    role: {
        id: string;
        name: string;
    };
}
