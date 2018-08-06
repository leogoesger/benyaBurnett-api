import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Article } from '../models';
import { typeENUM } from '../static/staticVar';

export function validatePostArticleReqParams(req: Request, res: Response) {
	if (!req.body.title) {
		return res.status(400).send({
			success: false,
			message: `Article title must be provided`,
			route: 'article/post',
		});
	}
	if (!req.body.text) {
		return res.status(400).send({
			success: false,
			message: `Article text must be provided`,
			route: 'article/post',
		});
	}
	if (!req.body.url) {
		return res.status(400).send({
			success: false,
			message: `Article url must be provided`,
			route: 'article/post',
		});
	}
	if (!req.body.imgUrl) {
		return res.status(400).send({
			success: false,
			message: `Image url must be provided`,
			route: 'article/post',
		});
	}

	if (!req.body.type) {
		return res.status(400).send({
			success: false,
			message: `Article type must be provided`,
			route: 'article/post',
		});
	} else {
		if (typeENUM.indexOf(req.body.type) === -1) {
			return res.status(400).send({
				success: false,
				message: `Article type must be one of ${typeENUM}`,
				route: 'article/post',
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

	upDateArticle: async (req: Request, res: Response) => {
		const article = await Article.updateOne(
			{ _id: req.body._id },
			req.body
		);
		if (article)
			return res.status(200).send({
				success: true,
				message: 'Article updated',
				route: 'admin',
			});
		else
			return res.status(400).send({
				success: false,
				message: 'Something went wrong! Try again',
				route: 'admin',
			});
	},

	removeArticel: async (req: Request, res: Response) => {
		console.log('delete : ', req.params.id);
		const article = await Article.remove({ _id: req.params.id });
		if (article)
			return res.status(200).send({
				success: true,
				message: 'Article removed',
				route: 'admin',
			});
		else
			return res.status(400).send({
				success: false,
				message: 'Something went wrong! Try again',
				route: 'admin',
			});
	},

	postArticle: async (req: Request, res: Response) => {
		validatePostArticleReqParams(req, res);

		try {
			const article = await Article.create(req.body);

			if (article) {
				return res.status(200).send({
					success: true,
					message: `Article posted successfully`,
					route: '/',
				});
			} else {
				return res.status(400).send({
					success: false,
					message: `Opps, something went wrong. Try again`,
					route: 'article/post',
				});
			}
		} catch (error) {
			return res.status(400).send({
				success: false,
				message: `Opps, something went wrong. Try again`,
				route: 'article/post',
			});
		}
	},
};

export default articleController;
