
export interface UserProps {
    id?: string;
    email: string;
    password?: string;
    createdAt: Date;
}

export class User {
    private props: UserProps;

    constructor(props: UserProps) {
        this.props = props;

        if (!this.validateEmail(props.email)) {
            throw new Error("Invalid email format");
        }
    }
    get id() { return this.props.id; }
    get email() { return this.props.email; }
    get password() { return this.props.password; }
    get createdAt() { return this.props.createdAt; }

    // Example: a@b.c
    private validateEmail(email: string): boolean {
        return email.includes("@") && email.includes(".")
            && email.indexOf("@") < email.lastIndexOf(".")
            && email.length >= 5;

    }
}