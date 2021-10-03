export class User {

    public constructor(user: User){
        this.id = user.id;
        this.externalRef = user.externalRef;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

    id: number | null;
    externalRef: string | null;
    username: string | null;
    password: string | null;
    role: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}