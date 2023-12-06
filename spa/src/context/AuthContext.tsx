'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import config from '../../config';
import {UserWithRole} from "../models/User";

interface AuthContextProps {
    user: UserWithRole | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserWithRole | null>(null);

    const fetchSession = async () => {
        const response = await request(config.authAPI.baseUrl + config.authAPI.routes.session, 'GET');

        if (response) {
            setUser(response);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await request(config.authAPI.baseUrl + config.authAPI.routes.login, 'POST', {
            email,
            password,
        });

        if (!response) {
            return false;
        }

        setUser(response);
        return true
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
        fetchSession();
    }, []);

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
    return useContext(AuthContext);
};

import { AxiosRequestConfig, AxiosResponse } from 'axios';

const request = async (url: string, method: string, data?: any): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            withCredentials: true,
        };

        const response: AxiosResponse = await axios(config);

        return response.data;
    } catch (error: any) {
        return null;
    }
};
