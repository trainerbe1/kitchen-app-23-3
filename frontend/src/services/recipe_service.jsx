import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function getRecipes(page, pageSize) {
    return (await axiosClient.get(`${app.apiUrl}/v1/recipes`, {
        params: {
            page,
            pageSize
        }
    })).data;
}

export async function getRecipesByName(name) {
    return (await axiosClient.get(`${app.apiUrl}/v1/recipes/name/${name}`)).data;
}

export async function addRecipe(body) {
    return (await axiosClient.post(`${app.apiUrl}/v1/recipes`, body)).data;
}

export async function deleteRecipeById(id) {
    return (await axiosClient.delete(`${app.apiUrl}/v1/recipes/${id}`)).data;
}

export async function getRecipeById(id) {
    return (await axiosClient.get(`${app.apiUrl}/v1/recipes/${id}`)).data;
}

export async function getRecipesByCategoryId(id) {
    return (await axiosClient.get(`${app.apiUrl}/v1/recipes/categories/${id}`)).data;
}