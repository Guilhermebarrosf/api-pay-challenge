import { useState, useEffect } from 'react';
import { BooksService, Book } from './books.service';
import { useRouter } from 'next/navigation';

export function useBooksController() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [form, setForm] = useState({ title: '', author: '', publishedAt: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) router.push('/');
        else loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            let data = await BooksService.getAll();
            setBooks(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.author || !form.publishedAt) return;

        await BooksService.create(form);
        setForm({ title: '', author: '', publishedAt: '' });
        loadBooks();
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentBook) return;

        try {
            await BooksService.update(currentBook.id, form);

            setIsEditing(false);
            setCurrentBook(null);
            setForm({ title: '', author: '', publishedAt: '' });

            loadBooks();
        } catch (error) {
            alert('Error in EditSave.');
            console.error(error);
        }
    };

    const handleSubmit = isEditing ? handleUpdate : handleSave;

    const startEdit = (book: Book) => {
        setCurrentBook(book);
        setForm({
            title: book.title,
            author: book.author,
            publishedAt: book.publishedAt
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            await BooksService.delete(id);
            loadBooks();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return {
        books,
        form,
        setForm,
        handleSubmit,
        handleDelete,
        handleLogout,

        isEditing,
        setIsEditing,
        startEdit
    };
}