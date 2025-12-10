import { IBookRepository } from "@/core/ports/repository/BookRepository";

export class DeleteBook {
    constructor(private bookRepository: IBookRepository) {}

    async execute(bookId: string): Promise<void> {
        const exists = await this.bookRepository.getBookById(bookId);
        if (!exists) throw new Error("Book not found");
        await this.bookRepository.deleteBook(bookId);
    }
}