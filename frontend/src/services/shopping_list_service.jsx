import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function addShoppingList(id) {
    return (await axiosClient.post(`${app.apiUrl}/v1/shopping-lists/recipes/${id}`)).data;
}

export async function getShoppingLists() {
    return (await axiosClient.get(`${app.apiUrl}/v1/shopping-lists`)).data;
}
export async function deleteShoppingLists(id) {
    return (await axiosClient.delete(`${app.apiUrl}/v1/shopping-lists/${id}`)).data;
}