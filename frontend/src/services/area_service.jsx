import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function getAreas() {
    return (await axiosClient.get(`${app.apiUrl}/v1/areas`)).data;
}