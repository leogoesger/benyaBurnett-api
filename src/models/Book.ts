import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: String,
    date: { type: Date, default: Date.now },
});

const Book = model("Book", bookSchema);

export default Book;
