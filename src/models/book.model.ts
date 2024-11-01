import mongoose from "mongoose";
import IBook from "../interfaces/book.interface";

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
