import { Role } from "./Role";

export interface UserWithRole{
    id: string;
    name: string;   
    email: string;
    password:string;
    role: Role
}

export interface User{
    id: string;
    name: string;
    email: string;
    role: string
}

export interface UserWithPassword{
    id: string;
    name: string;
    email: string;
    password:string;
    role: string
}

export interface PostUser{
    id: string;
    name: string;
    email: string;
    role: Role
}
