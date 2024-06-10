import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function addFavourite(id) {
    return (await axiosClient.post(`${app.apiUrl}/v1/favourites/recipes/${id}`)).data;
}

export async function getFavourites() {
    return (await axiosClient.get(`${app.apiUrl}/v1/favourites`)).data;
}

export async function deleteFavourite(id) {
    return (await axiosClient.delete(`${app.apiUrl}/v1/favourites/${id}`)).data;
}