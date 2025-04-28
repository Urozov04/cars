import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { jwtAuthGuard } from "../middlewares/auth.middleware.js";

const router = Router()
const controller = new UserController();

router
    .post('/signup', controller.createUser)
    .post('/signin', controller.signinUser)
    .post('/signout', jwtAuthGuard, controller.signoutUser)
    .get('/access-token', controller.acceessToken)
    
    .get('/', jwtAuthGuard, adminGuard, controller.getAllUsers)
    .get('/:id', jwtAuthGuard, SelfGuard, controller.getUserById)  
    .patch('/:id', jwtAuthGuard, SelfGuard, controller.updateUserById)
    .delete('/:id', jwtAuthGuard, SelfGuard, controller.deleteUserById);

export default router;
