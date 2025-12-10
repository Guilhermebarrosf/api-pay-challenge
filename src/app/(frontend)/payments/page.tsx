'use client';

import {usePaymentsController} from '@/modules/payments/usePayments';
import {QRCodeSVG} from 'qrcode.react';
import {CreditCard, Loader2, BookOpen, User, DollarSign, FileText, FileType, LogOut} from 'lucide-react';
import Link from 'next/link';
import {useBooksController} from "@/modules/books/useBooks";

export default function PaymentsPage() {
    const {form, setForm, handleSubmit, loading, result} = usePaymentsController();
    const {handleLogout} = useBooksController();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navbar*/}
            <nav className="flex justify-between items-center shadow-sm px-6 py-4 mb-8 flex gap-6">
                <div className="flex gap-6">
                    <Link href="/books"
                          className="flex items-center ml-8 gap-2 font-bold text-slate-400 hover:text-blue-600">
                        <BookOpen size={20}/> <span>Library</span>
                    </Link>
                    <div className="flex items-center ml-5 gap-2 font-bold text-red-600 border-b-2 border-red-600 pb-1">
                        <CreditCard size={20}/> <span>Payments</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center text-slate-500 hover:text-red-600 gap-2 text-sm font-medium transition"
                >
                    Logout <LogOut size={18}/>
                </button>
            </nav>

            <main className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* --- 1. FORMULÁRIO--- */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
                    <h2 className="text-lg font-bold text-slate-700 mb-6">New Transaction</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome do comprador */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Buyer Name</label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-3 text-slate-400" size={18}/>
                                <input
                                    required value={form.buyerName}
                                    onChange={e => setForm({...form, buyerName: e.target.value})}
                                    className="w-full pl-10 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                        </div>

                        {/* Valor */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Value</label>
                            <div className="relative mt-1">
                                <DollarSign className="absolute left-3 top-3 text-slate-400" size={18}/>
                                <input
                                    type="number" required value={form.amount}
                                    onChange={e => setForm({...form, amount: e.target.value})}
                                    className="w-full pl-10 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                        </div>

                        {/* Documento*/}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Document (CPF)</label>
                            <div className="relative mt-1">
                                <FileText className="absolute left-3 top-3 text-slate-400" size={18}/>
                                <input
                                    required value={form.document}
                                    onChange={e => setForm({...form, document: e.target.value})}
                                    className="w-full pl-10 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
                            <div className="relative mt-1">
                                <FileType className="absolute left-3 top-3 text-slate-400" size={18}/>
                                <textarea
                                    rows={2} value={form.description}
                                    onChange={e => setForm({...form, description: e.target.value})}
                                    className="w-full pl-10 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                />
                            </div>
                        </div>

                        <button disabled={loading}
                                onClick={handleSubmit}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2">
                            {loading ? <Loader2 className="animate-spin"/> : 'Create Transaction'}
                        </button>
                    </form>
                </div>

                {/* --- 2. RETORNO--- */}
                <div className="flex flex-col gap-4">
                    {result ? (
                        result.qrCodeText.includes('Pix Code not found') ? (
                            <div
                                className="bg-white p-6 rounded-xl shadow-lg border border-red-200 text-center animate-in fade-in">
                                <CreditCard size={48} className="mb-2 opacity-50"/>
                                <h3 className="text-xl font-bold text-red-600 mb-4">Error!</h3>
                                <p className="text-red-500">Value very expensive, please reduce and try again.</p>
                            </div>
                        ) : (
                            <div
                                className="bg-white p-6 rounded-xl shadow-lg border border-green-200 text-center animate-in fade-in">
                                <h3 className="text-xl font-bold text-green-600 mb-4">Success!</h3>

                                {/* QR Code */}
                                <h2 className="text-xl font-bold text-green-600 mb-4">QRCode!</h2>
                                <div className="bg-white p-4 inline-block border rounded mb-4 shadow-inner">
                                    <QRCodeSVG value={result.qrCodeText} size={160}/>
                                </div>

                                {/* Dados da Transação */}
                                <div className="bg-slate-50 p-3 rounded text-left border text-sm space-y-2">
                                    <p><strong>ID:</strong> {result.transactionId}</p>
                                    <p><strong>Buyer:</strong> {result.buyer}</p>
                                    <p><strong>Value:</strong> R$ {result.amount}</p>
                                    <p><strong>Status:</strong> {result.status}</p>
                                </div>
                            </div>
                        )
                    ) : (
                        <div
                            className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-300 min-h-[300px]">
                            <CreditCard size={48} className="mb-2 opacity-50"/>
                            <p>Transaction</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}