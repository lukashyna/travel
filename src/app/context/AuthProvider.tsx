'use client';

import {
    useEffect,
    useState,
    createContext,
    useCallback,
    ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance, { setAuthHandlers } from '@/app/config/axiosConfig';
import {
    AuthResponse,
    LoginData,
    RegisterData,
    AuthContextType,
} from '@/app/types/auth';

const TOKEN_KEY = process.env.NEXT_PUBLIC_BACKEND_TOKEN as string;

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    const saveToken = useCallback((newToken: string) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
    }, []);

    const clearToken = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
    }, []);

    const login = useCallback(
        async (body: LoginData) => {
            const { data } = await axiosInstance.post<AuthResponse>(
                '/user/login',
                body
            );

            saveToken(data.accessToken);
        },
        [saveToken]
    );

    const register = useCallback(
        async (body: RegisterData) => {
            const { data } = await axiosInstance.post<AuthResponse>(
                '/user/register',
                body
            );
            saveToken(data.accessToken);
        },
        [saveToken]
    );

    const logout = useCallback(async () => {
        await axiosInstance.get('/user/logout');
        clearToken();
    }, [clearToken]);

    const refresh = useCallback(async (): Promise<AuthResponse> => {
        try {
            const { data } =
                await axiosInstance.get<AuthResponse>('/user/refresh');
            saveToken(data.accessToken);
            return data;
        } catch (error: unknown) {
            clearToken();
            router.push('/auth/login');
            throw error;
        }
    }, [saveToken, clearToken, router]);

    useEffect(() => {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        if (savedToken) setToken(savedToken);

        setAuthHandlers(() => localStorage.getItem(TOKEN_KEY), refresh);
    }, [refresh]);

    const value = {
        isLoggedIn: Boolean(token),
        token,
        login,
        register,
        logout,
        refresh,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
