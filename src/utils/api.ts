import {HttpClient} from "./httpClient";

export default class Api extends HttpClient {
    public constructor() {
        super("http://localhost:4141/");
    }
}