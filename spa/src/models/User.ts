import { Role } from './Role';

export interface UserWithRole {
    id: string;
    name: string;
    email: string;
    password?: string;
    nif: string;
    phone: string;
    active: boolean;
    isApproved: boolean;
    role: Role;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    nif: string;
    phone: string;
    active: boolean;
    isApproved?: boolean;
    roleId: string;
}

export interface PostUser {
    name: string;
    email: string;
    nif: string;
    phone: string;
    active: boolean;
    password: string;
    role: Role;
}
