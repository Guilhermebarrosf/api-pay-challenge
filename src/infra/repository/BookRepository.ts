import {prisma} from "../db";
import {IBookRepository} from "../../core/ports/repository/BookRepository";
import {BookEntity} from "../../core/domain/Book";


export class BookRepository implements IBookRepository {

    async createBook(book: BookEntity): Promise<BookEntity> {
        const bookCreated = await prisma.book.create({
            data: {
                title: book.title,
                author: book.author,
                publishedAt: book.publishedAt,
            },
        });
        return new BookEntity({
            id: bookCreated.id,
            title: bookCreated.title,
            author: bookCreated.author,
            publishedAt: bookCreated.publishedAt
        });

    }

    async editBook(book: BookEntity): Promise<void> {

        await prisma.book.update({
            where: {id: book.id!},
            data: {
                title: book.title,
                author: book.author,
                publishedAt: book.publishedAt,
            },
        });
    }

    async deleteBook(bookId: string): Promise<void> {
        await prisma.book.delete({
            where: {id: bookId},
        });
    }

    async getBookById(bookId: string): Promise<BookEntity | null> {
        const bookRecord = await prisma.book.findUnique({
            where: {id: bookId},
        });

        if (!bookRecord) {
            return null;
        }

        return new BookEntity({
            id: bookRecord.id,
            title: bookRecord.title,
            author: bookRecord.author,
            publishedAt: bookRecord.publishedAt,
        })
    }

    async getAllBooks(): Promise<BookEntity[]> {
        const bookRecords = await prisma.book.findMany();
        return bookRecords.map((bookRecord: { id: any; title: any; author: any; publishedAt: any; }) => new BookEntity({
            id: bookRecord.id,
            title: bookRecord.title,
            author: bookRecord.author,
            publishedAt: bookRecord.publishedAt,
        }));
    }
}