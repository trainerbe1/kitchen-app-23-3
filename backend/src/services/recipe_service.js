import prismaClient from "../common/prisma.js";
import apiResponse from "../common/api_response.js";
import apiMessage from "../common/api_message.js";
import APIPagingResponse from "../common/api_paging_response.js";

export async function getRecipes(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const recipes = await prismaClient.recipes.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                category: true,
                area: true,
                favourites: true,
            }
        });

        const totalPages = Math.ceil(await prismaClient.recipes.count() / pageSize);

        return apiResponse(apiMessage.success, APIPagingResponse(page, pageSize, totalPages, recipes));
    } catch (error) {
        return apiResponse(apiMessage.internalServerError);
    }
}

export async function deleteRecipeById(req, res, next) {
    try {
        const recipe = await prismaClient.recipes.delete({
            where: {
                id: Number(req.params.id)
            },
            include: {
                category: true,
                area: true,
                favourites: true,
            }
        });

        return apiResponse(apiMessage.success, recipe);
    } catch (error) {
        console.error(error);
        return apiResponse(apiMessage.internalServerError);
    }
}

export async function addRecipe(req, res, next) {
    try {
        const recipe = await prismaClient.recipes.create({
            data: {
                img_url: req.body.img_url,
                ingredient: req.body.ingredient,
                instructions: req.body.instructions,
                name: req.body.name,
                video_url: req.body.video_url,
                area_id: req.body.area_id,
                category_id: req.body.category_id,
                tags: req.body.tags,
            }
        });

        return apiResponse(apiMessage.success, recipe);
    } catch (error) {
        return apiResponse(apiMessage.internalServerError);
    }
}

export async function getRecipesByCategoryId(req, res, next) {
    try {
        const recipes = await prismaClient.recipes.findMany({
            where: {
                category_id: Number(req.params.id)
            },
            include: {
                category: true,
                area: true,
                favourites: true,
            }
        });

        return apiResponse(apiMessage.success, recipes);
    } catch (error) {
        return apiResponse(apiMessage.internalServerError);
    }
}

export async function getRecipesByName(req, res, next) {
    try {
        const recipes = await prismaClient.recipes.findMany({
            where: {
                name: {
                    contains: req.params.name
                }
            },
            include: {
                category: true,
                area: true,
                favourites: true,
            }
        });

        return apiResponse(apiMessage.success, recipes);
    } catch (error) {
        return apiResponse(apiMessage.internalServerError);
    }
}

export async function getRecipeById(req, res, next) {
    try {
        const recipes = await prismaClient.recipes.findFirst({
            where: {
                id: Number(req.params.id)
            },
            include: {
                category: true,
                area: true,
                favourites: true
            }
        });

        return apiResponse(apiMessage.success, recipes);
    } catch (error) {
        console.error(error);
        return apiResponse(apiMessage.internalServerError);
    }
}