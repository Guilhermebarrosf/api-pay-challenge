import { BookController } from "@/infra/controllers/book/BookController";

const bookController = new BookController();

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: Request, context: RouteContext) {
    return bookController.handleGetById(request, await context.params);
}

export async function PUT(request: Request, context: RouteContext) {
    return bookController.handleEdit(request, await context.params);
}

export async function DELETE(request: Request, context: RouteContext) {
    return bookController.handleDelete(request, await context.params);
}