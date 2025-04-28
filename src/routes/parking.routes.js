import { Router } from "express";
import { ParkingController } from "../controllers/parking.controller.js";
import { jwtAuthGuard } from "../middlewares/auth.middleware.js";

const router = Router();
const controller = new ParkingController();

router
    .post('/', jwtAuthGuard, controller.createParking)
    .get('/', jwtAuthGuard, controller.getAllParkings)
    .get('/:id', jwtAuthGuard, controller.getParkingById)
    .patch('/:id', jwtAuthGuard, controller.updateParkingById)
    .delete('/:id', jwtAuthGuard, controller.deleteParkingById);

export default router;
