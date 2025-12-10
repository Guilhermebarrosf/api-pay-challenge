import { BookEntity } from "@/core/domain/Book";
import { IBookRepository } from "@/core/ports/repository/BookRepository";

interface EditBookDTO {
    id: string;
    title: string;
    author: string;
    publishedAt: number;
}

export class EditBook {
    constructor(private bookRepository: IBookRepository) {}

    async execute({ id, title, author, publishedAt }: EditBookDTO): Promise<void> {
        const exists = await this.bookRepository.getBookById(id);
        if (!exists) throw new Error("Book not found");
        const book = new BookEntity({
            id,
            title,
            author,
            publishedAt
        });

        await this.bookRepository.editBook(book);
    }
}