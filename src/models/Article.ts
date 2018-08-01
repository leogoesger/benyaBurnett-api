import { Schema, model } from 'mongoose';

const articleSchema = new Schema({
	title: { type: String, required: true },
	text: { type: String, required: true },
	date: { type: Date, default: Date.now },
	type: {
		type: String,
		enum: ['youtube', 'news', 'lecture', 'interview'],
		default: 'news',
		required: true,
	},
});

const Article = model('Article', articleSchema);

export default Article;
