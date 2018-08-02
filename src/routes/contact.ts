import { Router } from "express";
import { contactController } from "../controllers";

const contact = Router();

contact.route("/").post(contactController.submit);

export default contact;
