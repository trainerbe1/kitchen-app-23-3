import prismaClient from "../common/prisma.js";
import apiResponse from "../common/api_response.js";
import apiMessage from "../common/api_message.js";

export async function getAreas(req, res, next) {
    try {
        const areas = await prismaClient.areas.findMany({
            include: {
                recipes: true
            }
        });
        return apiResponse(apiMessage.success, areas);
    } catch (error) {
        return apiResponse(apiMessage.internalServerError);
    }
}
