import { BookEntity } from "@/core/domain/Book";
import { IBookRepository } from "@/core/ports/repository/BookRepository";

export class GetBookById {
    constructor(private bookRepository: IBookRepository) {}

    async execute(bookId: string): Promise<BookEntity | null> {
        return await this.bookRepository.getBookById(bookId);
    }
}