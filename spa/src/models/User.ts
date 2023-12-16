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
    isApproved: string;
}

export interface PostUser {
    name: string;
    email: string;
    nif: string;
    phone: string;
    active: boolean;
    password?: string;
    roleId: string;
}
