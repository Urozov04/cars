import { Router } from "express";
import { CarController } from "../controllers/car.controller.js";
import { jwtAuthGuard } from "../middlewares/auth.middleware.js";

const router = Router();
const controller = new CarController();

router
    .post('/', jwtAuthGuard, controller.createCar)
    .get('/', jwtAuthGuard, controller.getAllCars)
    .get('/:id', jwtAuthGuard, controller.getCarById)
    .patch('/:id', jwtAuthGuard, controller.updateCarById)
    .delete('/:id', jwtAuthGuard, controller.deleteCarById);

export default router;
