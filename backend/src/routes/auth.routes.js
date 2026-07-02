
import Router from "express";

import { authController } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register new user 
 * @access Public
*/


authRouter.post("/register",authController.registerUserController);


authRouter.post("/login",authController.loginController);

authRouter.get("/logout",authController.LogoutController);



authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

export default authRouter;
