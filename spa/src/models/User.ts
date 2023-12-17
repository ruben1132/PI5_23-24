import { Role } from './Role';

export interface UserWithRole {
    id: string;
    name: string;
    email: string;
    password?: string;
    nif: string;
    phone: string;
    role: Role;
    active: boolean;
    isApproved: string;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    nif: string;
    phone: string;
    roleId: string;
    active: boolean;
    isApproved?: string;
}

export interface UserSignUp {
    name: string;
    email: string;
    password: string;
    nif: string;
    phone: string;
}



