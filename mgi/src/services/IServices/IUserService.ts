import { Result } from '../../core/logic/Result';
import { IUserDTO, IUserWithRoleDTO } from '../../dto/IUserDTO';

export default interface IUserService {
    createUser(userDTO: IUserDTO): Promise<Result<IUserWithRoleDTO>>;
    getUsers(): Promise<Result<IUserWithRoleDTO[]>>;
    updateUser(userDTO: IUserDTO): Promise<Result<IUserWithRoleDTO>>;
    getUserById(userId: string): Promise<Result<IUserWithRoleDTO>>;
    deleteUser(userId: string): Promise<Result<void>>;
}
