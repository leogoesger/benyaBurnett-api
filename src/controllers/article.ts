import { Request, Response } from "express";
import { Article } from "../models";

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

    updateArticle: async (req: Request, res: Response) => {
        const { title, text, imgUrl, url, type } = req.body;

        const article = await Article.findByIdAndUpdate(
            req.body._id,
            {
                $set: {
                    title,
                    text,
                    imgUrl,
                    url,
                    type,
                },
            },
            { new: true }
        );
        res.status(200).send(article);
    },

    removeArticel: async (req: Request, res: Response) => {
        await Article.remove({ _id: req.params.id });
        return res.status(200).send({
            success: true,
            message: "Article removed",
            route: "admin",
        });
    },

    postArticle: async (req: Request, res: Response) => {
        try {
            const article = await Article.create(req.body);

            if (article) {
                return res.status(200).send(article);
            }
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: `Opps, something went wrong. Try again`,
                route: "article/post",
            });
        }
    },
};

export default articleController;
