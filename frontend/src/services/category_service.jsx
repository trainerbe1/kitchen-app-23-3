import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function getCategories() {
    return (await axiosClient.get(`${app.apiUrl}/v1/categories`)).data;
}