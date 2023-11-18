'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import config from '../../config';

interface User {
    email: string;
    password: string;
}

interface AuthContextProps {
    user: User | null;
    login: (userData: User) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const fetchSession = async () => {
        const response = await request(config.mgiAPI.baseUrl + config.mgiAPI.routes.session, 'GET');

        if (response) {
            const { user } = response;
            setUser(user);
        }
    };

    const login = async (userData: User) => {
        const response = await request(config.mgiAPI.baseUrl + config.mgiAPI.routes.login, 'POST', userData);
        if (!response) {
            return false;
        }
        setUser(response);
        return true
    };

    const logout = async () => {
        const response = await request(config.mgiAPI.baseUrl + config.mgiAPI.routes.logout, 'POST');
        if (response) {
            setUser(null);
        }
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
        console.log(error);
        return null;
    }
};
