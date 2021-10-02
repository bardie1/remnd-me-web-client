
import Api from "../utils/api"

class AuthService extends Api {
    public constructor(){
        super();
    }

    public login = (username: string, password: string): Promise<any>  => {
        return this.instance.post("auth/login", {username: username, password: password});
    }

    public signUp = (username: string, password: string): Promise<any> => {
        return this.instance.post<any>("users", {username: username, password: password});
    }
}

export default new AuthService();

