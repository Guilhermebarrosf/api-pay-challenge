import {BookRepository} from "@/infra/repository/BookRepository";
import {BookEntity} from "@/core/domain/Book";
import {CreateBook} from "@/core/use-cases/book/CreateBook";
import {GetBookById} from "@/core/use-cases/book/GetBookById";
import {GetAllBooks} from "@/core/use-cases/book/GetAllBooks";
import {EditBook} from "@/core/use-cases/book/EditBook";
import {DeleteBook} from "@/core/use-cases/book/DeleteBook";


export class BookController {
    private bookRepository = new BookRepository();

    async handleCreate(request: Request) {
        try {
            const body = await request.json();
            let {title, author, publishedAt} = body;
            if (isNaN(parseInt(publishedAt))) {
                return new Response(
                    JSON.stringify({message: "PublishedAt is not A Number"}),
                    {status: 400}
                );
            }
            const bookUseCase = new CreateBook(this.bookRepository);

            const bookEntity = new BookEntity({
                title,
                author,
                publishedAt: parseInt(publishedAt),
            });

            const result = await bookUseCase.execute(bookEntity);

            return new Response(JSON.stringify(result), {status: 201});
        } catch (error: any) {
            return new Response(
                JSON.stringify({message: error.message || "Unexpected Error"}),
                {status: 400}
            );
        }
    }

    async handleGetAll(request: Request) {
        try {
            const bookUseCase = new GetAllBooks(this.bookRepository);

            const result = await bookUseCase.execute();

            const response = result.map(book => {
                return book.toJSON()
            })

            return new Response(JSON.stringify(response), {status: 200});
        } catch (error: any) {
            return new Response(
                JSON.stringify({message: error.message || "Unexpected Error"}),
                {status: 400}
            );
        }
    }

    async handleEdit(request: Request, params: { id: string }) {
        try {
            const body = await request.json();
            const {title, author, publishedAt} = body;
            const {id} = params;
            if (isNaN(parseInt(publishedAt))) {
                return new Response(
                    JSON.stringify({message: "PublishedAt is not A Number"}),
                    {status: 400}
                );
            }

            const bookUseCase = new EditBook(this.bookRepository);

            await bookUseCase.execute({
                id,
                title,
                author,
                publishedAt: parseInt(publishedAt),
            });

            return new Response(null, {status: 204});
        } catch (error: any) {
            return new Response(
                JSON.stringify({message: error.message || "Unexpected Error"}),
                {status: 400}
            );
        }
    }

    async handleDelete(request: Request, params: { id: string }) {
        try {
            const {id} = params;

            const bookUseCase = new DeleteBook(this.bookRepository);

            await bookUseCase.execute(id);

            return new Response(null, {status: 204});
        } catch (error: any) {
            return new Response(
                JSON.stringify({message: error.message || "Unexpected Error"}),
                {status: 400}
            );
        }
    }

    async handleGetById(request: Request, params: { id: string }) {
        try {
            const {id} = params;

            const bookUseCase = new GetBookById(this.bookRepository);

            const result = await bookUseCase.execute(id);

            if (!result) {
                return new Response(
                    JSON.stringify({message: "Book not found"}),
                    {status: 404}
                );
            }

            return new Response(JSON.stringify(result), {status: 200});
        } catch (error: any) {
            return new Response(
                JSON.stringify({message: error.message || "Unexpected Error"}),
                {status: 400}
            );
        }
    }


}