import {prisma} from "../db";
import {IUserRepository} from "../../core/ports/repository/UserRepository";
import {User} from "../../core/domain/User";


export class UserRepository implements IUserRepository {


    async createUser(user: User): Promise<{ userId: string }> {
        const userCreated = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password!,
                createdAt: user.createdAt,
            },
        });
        return {
            userId: userCreated.id
        }

    }

    async getUserByEmail(email: string): Promise<User | null> {
        const userRecord = await prisma.user.findUnique({
            where: {email},
        });

        if (!userRecord) {
            return null;
        }

        return new User({
            id: userRecord.id,
            email: userRecord.email,
            password: userRecord.password || undefined,
            createdAt: userRecord.createdAt,
        });
    }
}