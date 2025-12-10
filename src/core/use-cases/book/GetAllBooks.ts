import { BookEntity } from "@/core/domain/Book";
import { IBookRepository } from "@/core/ports/repository/BookRepository";

export class GetAllBooks {
    constructor(private bookRepository: IBookRepository) {}

    async execute(): Promise<BookEntity[]> {
        return await this.bookRepository.getAllBooks();
    }
}