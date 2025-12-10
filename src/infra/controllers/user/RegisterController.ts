import {NextResponse} from "next/server";
import {UserRepository} from "../../repository/UserRepository";
import {CreateUser} from "@/core/use-cases/user/CreateUser";
import {JwtTokenProvider} from "@/infra/providers/JwtTokenProvider";

export class RegisterController {

    private userRepository = new UserRepository();
    private tokenProvider = new JwtTokenProvider();

    async handleCreateLogin(request: Request): Promise<NextResponse> {
        try {
            const body = await request.json();
            const {email, password} = body;

            const createdUser = new CreateUser(this.userRepository);

            const result = await createdUser.execute({email, password});

            return NextResponse.json(result);
        } catch (error: any) {
            return NextResponse.json(
                {message: error.message || "Unespacted Error"},
                {status: 401}
            );
        }
    }
}