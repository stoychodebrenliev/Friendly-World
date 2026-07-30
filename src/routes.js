import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import animalController from "./controllers/animalController.js";

const routes = Router();

routes.use(homeController);
routes.use(authController);
routes.use(animalController);

export default routes;

