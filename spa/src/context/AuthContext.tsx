'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import config from '../../config';
import { UserWithRole } from '../models/User';
import { redirect } from 'next/navigation';

interface LoginResponse {
    content: string | UserWithRole;
    value: boolean;
}
interface AuthContextProps {
    user: UserWithRole | null;
    login: (email: string, password: string) => Promise<string>;
    logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserWithRole | null>(null);

    const fetchSession = async (): Promise<boolean> => {
        const response = await request(config.authAPI.baseUrl + config.authAPI.routes.session, 'GET');

        if (response) {
            setUser(response.content as UserWithRole);
            return true;
        }

        return false;
    };

    const login = async (email: string, password: string): Promise<string> => {
        const response = await request(config.authAPI.baseUrl + config.authAPI.routes.login, 'POST', {
            email,
            password,
        });

        if (!response.value) {
            return response.content.toString();
        }

        setUser(response.content as UserWithRole);
        return null;
    };

    const logout = async () => {
        const response = await request(config.authAPI.baseUrl + config.authAPI.routes.logout, 'POST');
        if (response) {
            setUser(null);
            return true;
        }
        return false;
    };

    useEffect(() => {
        const sesh = async () => {
            const result = await fetchSession();

            if (!result) redirect('/login');
        };

        sesh();
    }, []);

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
    return useContext(AuthContext);
};

import { AxiosRequestConfig, AxiosResponse } from 'axios';

const request = async (url: string, method: string, data?: any): Promise<LoginResponse> => {
    try {
        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            withCredentials: true,
        };

        const response: AxiosResponse = await axios(config);

        if (response.status === 200) {
            return {
                content: response.data,
                value: true,
            };
        }

        return {
            content: 'error',
            value: false,
        };
    } catch (error: any) {
        console.log(error?.response?.data?.error);

        return {
            content: error.response.data.error,
            value: false,
        };
    }
};
