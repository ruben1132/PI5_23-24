import IRoleDTO from "./IRoleDTO";

export interface IUserDTO{
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserWithRoleDTO {
  id: string;
  username: string;
  email: string;
  password: string;
  role: IRoleDTO;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}
