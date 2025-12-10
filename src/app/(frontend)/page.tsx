'use client';
import { useState } from 'react';
import { useAuthController } from '@/modules/auth/useAuth';
import { Lock, Mail, ArrowRight, UserPlus, LogIn } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { handleSubmit, loading, isRegister, setIsRegister } = useAuthController();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-slate-900 p-8 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        {isRegister ? 'Create Account' : 'Welcome'}
                    </h1>
                    <p className="text-slate-400 text-sm mt-2">
                        {isRegister ? 'Join our library community' : 'Access your platform account'}
                    </p>
                </div>

                <div className="p-8">
                    <form onSubmit={(e) => handleSubmit(e, email, pass)} className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="email" placeholder="Email Address" required
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="password" placeholder="Password" required
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={e => setPass(e.target.value)}
                            />
                        </div>

                        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition flex justify-center items-center gap-2">
                            {loading ? 'Processing...' : (isRegister ? 'Sign Up' : 'Sign In')}
                            {!loading && (isRegister ? <UserPlus size={20}/> : <LogIn size={20}/>)}
                        </button>
                    </form>

                    <div className="mt-6 text-center border-t pt-6">
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-blue-600 font-semibold hover:underline text-sm"
                        >
                            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}