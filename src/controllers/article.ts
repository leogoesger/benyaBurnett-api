import { Request, Response } from "express";
import { Article } from "../models";
import { verify, sign } from "jsonwebtoken";
import { error } from "util";

const articleController = {
    show: (req: Request, res: Response) => {
        Article.find({}, (error, articles) => {
            return res.send(articles);
        });
    },
};

export default articleController;
