import { HttpClient } from "aurelia-fetch-client";
import { autoinject, inject, NewInstance } from "aurelia-framework";
import { TokenService } from "./tokenService";

@autoinject
export class UserService {
    //private tokenService: TokenService;
    private USERNAME_KEY = "user_name";
    private usernameJson: any;

    constructor(private tokenService: TokenService, private http: HttpClient) {
        this.tokenService = tokenService;
    }

    // Saves the username it aquired from the api saved to localstorage.
    saveUserName() {
        const jwt = this.tokenService.getJWT();
        if (!jwt) {
            throw new Error("No JWT present");
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
                    console.log("Data: ", data);
                    localStorage.setItem(this.USERNAME_KEY, data.username);
                } catch (Error) { }
            });
    }

    // Goes to localstorage and if the username is there returns it.
    getUserName(): any {
        this.usernameJson = localStorage.getItem(this.USERNAME_KEY);
        if (this.usernameJson) {
            const userName = JSON.parse(this.usernameJson);
            return userName;
        } else {
            return null;
        }
    }
}
