import { Router } from "express";
import { articleController } from "../controllers";

const article = Router();

article.route("/").get(articleController.getArticles);
article.route("/").post(articleController.postArticle);
article.route("/:type").get(articleController.getArticlesByType);

export default article;
