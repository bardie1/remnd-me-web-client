import { AxiosRequestConfig } from "axios";
import { sessionService } from "../services/session";
import { HttpClient } from "./httpClient";

export default class ApiProtected extends HttpClient {
    public constructor() {
        super("http://localhost:4141/");
        this._initializeRequestInterceptor();
    }

    private _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this._handleRequest,
        );
    };

    private _handleRequest = (config: AxiosRequestConfig) => {
        config.headers['x-access-token'] = sessionService.getUser().tokens.token;
        return config;
    }
}