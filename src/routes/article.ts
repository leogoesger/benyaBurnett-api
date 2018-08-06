import { Router } from 'express';
import { articleController } from '../controllers';
import authenticate from '../middlewares/authenticate';

const article = Router();

article.route('/').get(articleController.getArticles);
article.route('/:type').get(articleController.getArticlesByType);

article.post('/post', authenticate, articleController.postArticle);
article.put('/update', authenticate, articleController.upDateArticle);
article.delete('/remove/:id', authenticate, articleController.removeArticel);

export default article;
