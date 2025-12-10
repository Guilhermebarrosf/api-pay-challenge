import {IUserRepository} from "../../ports/repository/UserRepository";
import {TokenProvider} from "../../ports/provider/TokenProvider";
import bcrypt from "bcryptjs";

export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    success: boolean;
    message: string;
    userId?: string;
    token?: string;
}

export class LoginUser {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository, private tokenProvider: TokenProvider) {
        this.userRepository = userRepository;
    }

    async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
        const {email, password} = request;

        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }

        if (!user.password) {
            return {
                success: false,
                message: "User has no password set",
            };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return {
                success: false,
                message: "Invalid password",
            };
        }
        const token = this.tokenProvider.generate({
            userId: user.id,
            email: user.email,
        })
        return {
            success: true,
            message: "Login successful",
            userId: user.id,
            token: token
        };
    }
}