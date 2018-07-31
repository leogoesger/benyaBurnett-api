import { Router } from "express";
import { userController } from "../controllers";

const user = Router();

user.route("/login").get(userController.logIn);
user.route("/signup").post(userController.signUp);
user.route("/changePWD").get(userController.changePWD);

export default user;
