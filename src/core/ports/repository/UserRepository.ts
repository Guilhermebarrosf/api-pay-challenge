import { User } from '../../domain/User';

export interface IUserRepository {
    createUser(user: User): Promise<{ userId: string }>;
    getUserByEmail(email: string): Promise<User | null>;
}