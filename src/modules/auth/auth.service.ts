export interface AuthResponse {
    token: string;
    user: { email: string };
}

export const AuthService = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    },

    register: async (email: string, password: string): Promise<void> => {
        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Registration failed');
    }
};