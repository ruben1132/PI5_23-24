import { Result } from '../../core/logic/Result';
import {IUserWithRoleDTO, IUserSignupDTO } from '../../dto/IUserDTO';

export default interface IUserService {
    login(email: string, password: string): Promise<Result<{ userDTO: IUserWithRoleDTO; token: string }>>;
    signup(userDTO : IUserSignupDTO): Promise<Result<{ userDTO: IUserWithRoleDTO; token: string }>>;
    session(token: string): Promise<Result<IUserWithRoleDTO>>;
}
