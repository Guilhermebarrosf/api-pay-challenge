import jwt from "jsonwebtoken";
import { TokenProvider } from "../../core/ports/provider/TokenProvider";

export class JwtTokenProvider implements TokenProvider {
    private readonly secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || "myKey";
    }

    generate(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: "1d" });
    }

    verify(token: string): any {
        return jwt.verify(token, this.secret);
    }
}