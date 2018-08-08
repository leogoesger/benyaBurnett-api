import { Schema, model } from "mongoose";

const typeENUM = [
    "online-lectures",
    "video-interviews",
    "reviews",
    "published-articles",
    "upcoming-events",
];

const articleSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: new Date() },
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
