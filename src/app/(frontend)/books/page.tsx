'use client';
import { useBooksController } from '@/modules/books/useBooks';
import { Trash2, Plus, BookOpen, LogOut, CreditCard, Edit2, X } from 'lucide-react';
import Link from "next/link";

export default function BooksPage() {
    const {
        books,
        form,
        setForm,
        handleSubmit,
        handleDelete,
        handleLogout,
        isEditing,
        startEdit,
        setIsEditing
    } = useBooksController();

    const handleCancelEdit = () => {
        setForm({ title: '', author: '', publishedAt: '' });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* --- Navbar com Navegação e Logout --- */}
            <nav className="flex justify-between items-center bg-white shadow-sm px-6 py-4 mb-8">
                <div className="flex gap-8 items-center">

                    <Link
                        href="/books"
                        className="flex items-center ml-8 gap-2 font-bold text-blue-600 border-b-2 border-blue-600 pb-1 transition cursor-default"
                    >
                        <BookOpen size={18}/> <span>Library</span>
                    </Link>

                    <Link
                        href="/payments"
                        className="flex items-center ml-8 gap-2 font-bold text-slate-400 hover:text-red-600 transition"
                    >
                        <CreditCard size={18}/> <span>Payments</span>
                    </Link>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center text-slate-500 hover:text-red-600 gap-2 text-sm font-medium transition"
                >
                    Logout <LogOut size={18}/>
                </button>
            </nav>

            <main className="max-w-5xl mx-auto p-6">

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-700">
                            {isEditing ? 'Editing Book' : 'Add New Book'}
                        </h2>
                        {isEditing && (
                            <button
                                onClick={handleCancelEdit}
                                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                            >
                                <X size={16} /> Cancel Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full">
                            <label className="text-xs font-bold text-slate-400 uppercase">Title</label>
                            <input
                                value={form.title}
                                onChange={e => setForm({...form, title: e.target.value})}
                                className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Domain-Driven Design"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold text-slate-400 uppercase">Author</label>
                            <input
                                value={form.author}
                                onChange={e => setForm({...form, author: e.target.value})}
                                className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Eric Evans"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold text-slate-400 uppercase">Published:</label>
                            <input
                                value={form.publishedAt}
                                onChange={e => setForm({...form, publishedAt: e.target.value})}
                                className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="2003"
                            />
                        </div>
                        <button type="submit"
                                className={`w-full md:w-auto text-white px-6 py-3.5 rounded-lg font-bold flex justify-center gap-2 transition 
                                            ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                            {isEditing ? (
                                <><Edit2 size={20}/> Save Changes</>
                            ) : (
                                <><Plus size={20}/> Add</>
                            )}
                        </button>
                    </form>
                </div>



                <div className="grid gap-4 md:hidden">
                    {books.map(book => (
                        <div key={book.id}
                             className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">{book.title}</h3>
                                <p className="text-slate-500">{book.author} ({book.publishedAt})</p>
                            </div>
                            <div className="flex gap-2">
                                {/* Botão de Edição Mobile */}
                                <button onClick={() => startEdit(book)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                    <Edit2 size={20} />
                                </button>
                                {/* Botão de Delete Mobile */}
                                <button onClick={() => handleDelete(book.id)} className="p-2 text-red-500 bg-red-50 rounded-lg">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="p-4 font-bold text-slate-600">ID</th>
                            <th className="p-4 font-bold text-slate-600">Title</th>
                            <th className="p-4 font-bold text-slate-600">Author</th>
                            <th className="p-4 font-bold text-slate-600">Published</th>
                            <th className="p-4 font-bold text-slate-600 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {books.map(book => (
                            <tr key={book.id} className="hover:bg-slate-50 transition">
                                <td className="p-4 text-slate-400 font-mono text-sm">{book.id.substring(0, 6)}...</td>
                                <td className="p-4 font-medium text-slate-800">{book.title}</td>
                                <td className="p-4 text-slate-600">{book.author}</td>
                                <td className="p-4 text-slate-600">{book.publishedAt}</td>
                                <td className="p-4 text-right">
                                    {/* Botão de Edição Desktop */}
                                    <button onClick={() => startEdit(book)}
                                            className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition"
                                            title="Edit">
                                        <Edit2 size={18}/>
                                    </button>
                                    {/* Botão de Delete Desktop */}
                                    <button onClick={() => handleDelete(book.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                            title="Delete">
                                        <Trash2 size={18}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {books.length === 0 && <div className="p-8 text-center text-slate-400">No books found.</div>}
                </div>
            </main>
        </div>
    );
}