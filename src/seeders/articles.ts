import { Article } from "../models";

import {
    onlineLecture,
    publishedArticles,
    reviews,
    upcomingEvents,
    videoInterviews,
} from "./data";

const seedArticles = () =>
    Article.remove({}).then(() =>
        Article.collection.insertMany([
            ...onlineLecture,
            ...publishedArticles,
            ...reviews,
            ...upcomingEvents,
            ...videoInterviews,
        ])
    );

export default seedArticles;
