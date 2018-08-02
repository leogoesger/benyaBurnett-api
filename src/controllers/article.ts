import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Article } from "../models";
import { typeENUM } from "../static/staticVar";

export function validatePostArticleReqParams(req: Request, res: Response) {
    if (!req.body.title) {
        return res.status(400).send({
            success: false,
            message: `Article title must be provided`,
            route: "article/post",
        });
    }
    if (!req.body.text) {
        return res.status(400).send({
            success: false,
            message: `Article text must be provided`,
            route: "article/post",
        });
    }
    if (!req.body.url) {
        return res.status(400).send({
            success: false,
            message: `Article url must be provided`,
            route: "article/post",
        });
    }

    if (!req.body.type) {
        return res.status(400).send({
            success: false,
            message: `Article type must be provided`,
            route: "article/post",
        });
    } else {
        if (typeENUM.indexOf(req.body.type) === -1) {
            return res.status(400).send({
                success: false,
                message: `Article type must be one of ${typeENUM}`,
                route: "article/post",
            });
        }
    }
}

const articleController = {
    getArticles: (req: Request, res: Response) => {
        Article.find({}, (error, articles) => {
            return res.send(articles);
        });
    },

    getArticlesByType: (req: Request, res: Response) => {
        Article.find({ type: req.params.type }, (_, articles) => {
            return res.status(200).send(articles);
        });
    },

    async postArticle(req: Request, res: Response) {
        const token = req.body.token;
        // decode token
        if (token) {
            // verifies secret and checks exp
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);

                if (!decoded) {
                    return res.status(401).send({
                        success: false,
                        message: "You are not authrized to post articles",
                        route: "user/login",
                    });
                } else {
                    validatePostArticleReqParams(req, res);

                    const article = await Article.create(req.body);

                    if (article) {
                        return res.status(200).send({
                            success: true,
                            message: `Article posted successfully`,
                            route: "/",
                        });
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: `Opps, something went wrong. Try again`,
                            route: "article/post",
                        });
                    }
                }
            } catch (err) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid token",
                    route: "user/login",
                });
            }
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: "No token provided",
                route: "user/login",
            });
        }
    },
};

export default articleController;
