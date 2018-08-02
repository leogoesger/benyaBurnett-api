import { Schema, model } from "mongoose";
import { typeENUM } from "../static/staticVar";

const articleSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: {
        type: String,
        enum: typeENUM,
        default: "news",
        required: true,
    },
    url: { type: String },
    imgUrl: { type: String },
});

const Article = model("Article", articleSchema);

export default Article;
