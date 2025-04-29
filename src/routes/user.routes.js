import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { jwtAuthGuard } from "../middlewares/auth.middleware.js";

const router = Router()
const controller = new UserController();

router
    .post('/signup', controller.createUser)
    .post('/signin', controller.signinUser)
    .post("/signin/confirm", controller.confirmLogin)
    .post('/signout', jwtAuthGuard, controller.signoutUser)
    // .get('/access-token', controller.acceessToken)
    
    .get('/', jwtAuthGuard, controller.getAllUsers)
    .get('/:id', jwtAuthGuard, controller.getUserById)  
    .patch('/:id', jwtAuthGuard, controller.updateUserById)
    .delete('/:id', jwtAuthGuard, controller.deleteUserById);

export default router;
