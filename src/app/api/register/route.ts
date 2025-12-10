import {RegisterController} from "@/infra/controllers/user/RegisterController";

export async function POST(request: Request) {
    const registerController = new RegisterController();
    return registerController.handleCreateLogin(request);
}
