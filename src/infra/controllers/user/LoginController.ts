import {NextResponse} from "next/server";
import {UserRepository} from "../../repository/UserRepository";
import {LoginUser} from "@/core/use-cases/login/LoginUser";
import {JwtTokenProvider} from "@/infra/providers/JwtTokenProvider";

export class LoginController {

    private userRepository = new UserRepository();
    private tokenProvider = new JwtTokenProvider();

    async handleLogin(request: Request): Promise<NextResponse> {
        try {
            const body = await request.json();
            const {email, password} = body;


            const loginUser = new LoginUser(this.userRepository, this.tokenProvider);

            const result = await loginUser.execute({email, password});

            return NextResponse.json(result);
        } catch (error: any) {
            return NextResponse.json(
                {message: error.message || "Unespacted Error"},
                {status: 401}
            );
        }
    }

}