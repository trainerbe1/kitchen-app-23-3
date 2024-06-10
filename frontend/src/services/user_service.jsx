import axiosClient from "../common/axios_client";
import app from "../common/app";

export async function getUsers(page = null, pageSize = null) {
    return (await axiosClient.get(`${app.apiUrl}/v1/users`, {
        params: {
            page,
            pageSize
        }
    })).data;
}

export async function deleteUser(id) {
    return (await axiosClient.delete(`${app.apiUrl}/v1/users/${id}`)).data;
}