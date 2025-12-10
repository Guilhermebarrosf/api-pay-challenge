import { BookEntity } from "@/core/domain/Book";
import { IBookRepository } from "@/core/ports/repository/BookRepository";

interface CreateBookDTO {
    title: string;
    author: string;
    publishedAt: number;
}

export class CreateBook {
    constructor(private bookRepository: IBookRepository) {}

    async execute({ title, author, publishedAt }: CreateBookDTO): Promise<BookEntity> {
        const book = new BookEntity({
            title,
            author,
            publishedAt
        });

        const createdBook = await this.bookRepository.createBook(book);
        return createdBook;
    }
}