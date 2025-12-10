export interface Book {
    id: string;
    title: string;
    author: string;
    publishedAt: string;
}

export const BooksService = {
    getAll: async (): Promise<Book[]> => {
        const res = await fetch('/api/books');
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
    },

    create: async (book: { title: string, author: string, publishedAt: string }): Promise<Book> => {
        const res = await fetch('/api/books', {
            method: 'POST',
            body: JSON.stringify(book),
        });
        return res.json();
    },

    delete: async (id: string): Promise<void> => {
        await fetch(`/api/books/${id}`, {method: 'DELETE'});
    },

    update: async (id: string, book: { title: string, author: string, publishedAt: string }): Promise<Book> => {
        const res = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            body: JSON.stringify(book),
        });
        return {...book, id: id};
    }
};