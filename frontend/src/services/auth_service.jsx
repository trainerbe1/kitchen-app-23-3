import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function refreshToken() {
    return (await axiosClient.post(`${app.apiUrl}/v1/auth/refresh/${localStorage.getItem('refreshToken')}`)).data;
}

export async function login(username, password) {
    return (await axiosClient.post(`${app.apiUrl}/v1/auth/login`, {
        username, 
        password
    })).data;
}

export async function register(username, password, repeatPassword) {
    return (await axiosClient.post(`${app.apiUrl}/v1/auth/register`, {
        username, 
        password,
        repeatPassword
    })).data;
}

export async function logout() {
    return (await axiosClient.delete(`${app.apiUrl}/v1/auth/logout/${localStorage.getItem('refreshToken')}`)).data;
}