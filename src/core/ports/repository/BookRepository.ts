import {BookEntity} from "@/core/domain/Book";

export interface IBookRepository {
    createBook(book: BookEntity): Promise<BookEntity>;
    editBook(book: BookEntity): Promise<void>;
    deleteBook(bookId: string): Promise<void>;
    getBookById(bookId: string): Promise<BookEntity | null>;
    getAllBooks(): Promise<BookEntity[]>;
}