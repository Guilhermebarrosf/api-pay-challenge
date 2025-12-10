import { BookController } from "@/infra/controllers/book/BookController";

const bookController = new BookController();

export async function GET(request: Request) {
    return bookController.handleGetAll(request);
}

export async function POST(request: Request) {
    return bookController.handleCreate(request);
}