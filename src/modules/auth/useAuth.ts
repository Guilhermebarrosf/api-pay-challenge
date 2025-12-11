import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from './auth.service';

export function useAuthController() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = async (e: React.FormEvent, email: string, password: string) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isRegister) {
                await AuthService.register(email, password);
                setIsRegister(false);
                alert('Account created! Please log in.');
            } else {
                const data = await AuthService.login(email, password);
                if(data.token){
                    localStorage.setItem('token', data.token);
                    router.push('/books');
                }else{
                    alert('Login failed. Check your credentials or register.');
                }

            }
        } catch (err) {
            alert('Operation failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, loading, isRegister, setIsRegister };
}