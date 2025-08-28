import axiosInstance from '@/app/config/axiosConfig';
import { AxiosResponse } from 'axios';

interface LoginBody {
    email: string;
    password: string;
}

interface RegisterBody {
    email: string;
    password: string;
    name: string;
}

interface UserInfo {
    email: string;
    name: string;
}

export const login = (
    body: LoginBody
): Promise<AxiosResponse<{ token: string; user: UserInfo }>> => {
    return axiosInstance.post('/user/login', body);
};

export const registerUser = (
    body: RegisterBody
): Promise<AxiosResponse<{ token: string; user: UserInfo }>> => {
    return axiosInstance.post('/user/register', body);
};

export const logout = (): Promise<AxiosResponse<void>> => {
    return axiosInstance.get('/user/logout');
};

export const refresh = (): Promise<AxiosResponse<{ token: string }>> => {
    return axiosInstance.get('/user/refresh');
};

export const getUserInfo = (): Promise<AxiosResponse<UserInfo>> => {
    return axiosInstance.get('/user/me');
};
