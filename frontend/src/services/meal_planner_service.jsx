import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function getMealPlans() {
    return (await axiosClient.get(`${app.apiUrl}/v1/meal-plans`)).data;
}

export async function getMealPlansByDate(date) {
    return (await axiosClient.get(`${app.apiUrl}/v1/meal-plans/date/${date}`)).data;
}

export async function deleteMealPlan(id) {
    return (await axiosClient.delete(`${app.apiUrl}/v1/meal-plans/${id}`)).data;
}

export async function addMealPlan(body) {
    return (await axiosClient.post(`${app.apiUrl}/v1/meal-plans`, body)).data;
}