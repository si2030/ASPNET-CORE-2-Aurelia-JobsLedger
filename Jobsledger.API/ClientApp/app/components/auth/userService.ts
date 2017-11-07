import { HttpClient } from "aurelia-fetch-client";
import { autoinject, inject, NewInstance } from "aurelia-framework";
import { TokenService } from "./tokenService";

@autoinject
export class UserService {
    //private tokenService: TokenService;
    private USERNAME_KEY = "user_name";
    private username: string = "anonymous";

    constructor(
        private tokenService: TokenService,
        private http: HttpClient) {
        this.tokenService = tokenService;
    }

    // Saves the username it aquired from the api after saving it to localstorage.
    saveUserName(): string {
        const jwt = this.tokenService.getJWT();
        if (!jwt) {
            return "anonymous";
        }
        const token = jwt.access_token;

        const headers = new Headers({
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        });

        const task = fetch("/api/jwt/userName", {
            method: "GET",
            headers
        })
            .then(response => response.json())
            .then(data => {
                try {
                    console.log("Data on userService.ts: ", data);
                    localStorage.setItem(this.USERNAME_KEY, data.username);

                    return data.userName;

                } catch (Error) { return null }
            });
        return this.username;
    }

    // Goes to localstorage and if the username is there returns it.
    getUserName(): string {
        var username = localStorage.getItem(this.USERNAME_KEY);

        console.log("username in userService.getusername: ", username)
        if (username) {

            return username;
        } else {
            return "anonymous";
        }
    }
}