
import { AxiosResponse } from "axios";
import { User } from "../models/user";
import Api from "../utils/api"

class AuthService extends Api {
    public constructor(){
        super();
    }

    public login = (username: string, password: string): Promise<any>  => {
        return this.instance.post("auth/login", {username: username, password: password});
    }

    public signUp = (username: string, password: string): Promise<AxiosResponse<User>> => {
        return this.instance.post<any>("users", {username: username, password: password}, {
            transformResponse: [(data) => {
                let dataParsed = JSON.parse(data);
                if (dataParsed.isError) {
                    return dataParsed;
                } else {
                    return new User(dataParsed);
                }
            }],
        });
    }
}

export default new AuthService();

