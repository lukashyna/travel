import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { AuthResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

let getToken: () => string | null;
let refreshToken: () => Promise<AuthResponse>;

export const setAuthHandlers = (
    getTokenHandler: () => string | null,
    refreshTokenHandler: () => Promise<AuthResponse>
) => {
    getToken = getTokenHandler;
    refreshToken = refreshTokenHandler;
};

axiosInstance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
        if (getToken) {
            const token = getToken();
            if (token && request.headers) {
                request.headers.Authorization = `Bearer ${token}`;
            }
        }
        return request;
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig;
        const isAuthRoute =
            originalRequest?.url?.includes('/user/login') ||
            originalRequest?.url?.includes('/user/register');

        if (error.response?.status === 401 && refreshToken && !isAuthRoute) {
            try {
                await refreshToken();
                return axiosInstance(originalRequest);
            } catch (e) {
                return Promise.reject(
                    Object.assign({}, e, { redirectToLogin: true })
                );
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
