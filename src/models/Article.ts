import { Schema, model } from "mongoose";

const articleSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    articleType: {
        type: String,
        enum: ["youtube", "news", "lectures", "interviews"],
        default: "news",
        required: true,
    },
});

const Article = model("Article", articleSchema);

export default Article;
