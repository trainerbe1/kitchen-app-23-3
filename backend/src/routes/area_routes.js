import { Router } from 'express';
import areaController from "../controllers/area_controller.js";

const areaRoutes = Router();

areaRoutes.use('/v1/', areaController);

export default areaRoutes;