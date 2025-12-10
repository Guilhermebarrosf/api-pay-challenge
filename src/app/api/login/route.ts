import {LoginController} from "@/infra/controllers/user/LoginController";

export async function POST(request: Request) {
    const loginController = new LoginController();
    return loginController.handleLogin(request);
}
