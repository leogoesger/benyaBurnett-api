import { Router } from "express";
import { userController } from "../controllers";
import authenticate from "../middlewares/authenticate";

const user = Router();

user.route("/login").post(userController.logIn);
user.route("/signup").post(userController.signUp);
user.route("/users").post(userController.listUsers);
user.get("/getme", authenticate, userController.getme);

export default user;
