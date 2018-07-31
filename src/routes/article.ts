import { Router } from "express";
import { articleController } from "../controllers";

const article = Router();

article.route("/showall").get(articleController.show);

export default article;
