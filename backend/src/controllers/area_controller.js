import { Router } from "express";
import isAuthorized from "../middlewares/is_authorized.js";
import { getAreas } from "../services/area_service.js";

const areaController = Router();

areaController.get('/areas', isAuthorized, async (req, res, next) => {
    // #swagger.tags = ['Areas']
    // #swagger.description = 'Get Areas'
     // #swagger.security = [{ "apiKeyAuth": [] }]

    return res.send(await getAreas(req, res, next));
});

export default areaController;