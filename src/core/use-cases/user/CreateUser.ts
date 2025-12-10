import {User} from "@/core/domain/User";
import {IUserRepository} from "@/core/ports/repository/UserRepository";
import bcrypt from "bcryptjs";

export interface CreateLoginUserRequest {
    email: string;
    password: string;
}

export interface CreateLoginUserResponse {
    success: boolean;
    message: string;
    userId?: string;
}

export class CreateUser {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(request: CreateLoginUserRequest): Promise<CreateLoginUserResponse> {
        const {email, password} = request;

        const existingUser = await this.userRepository.getUserByEmail(email);
        if (existingUser) {
            return {
                success: false,
                message: "User already exists",
            };
        }

        if (!password) {
            return {
                success: false,
                message: "Password is Required for registration",
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        const userCreated = await this.userRepository.createUser(newUser);

        return {
            success: true,
            message: "User created successfully",
            userId: userCreated.userId,
        };
    }
}