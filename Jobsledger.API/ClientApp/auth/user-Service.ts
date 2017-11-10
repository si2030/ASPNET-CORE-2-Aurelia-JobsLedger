import { HttpClient } from "aurelia-fetch-client";
import { autoinject } from "aurelia-framework";
import { AuthService } from "./auth-service"

@autoinject
export class UserService {
    private USERNAME_KEY = "user_name";
    private USERROLES_KEY = "user_roles"

    constructor(private authService: AuthService, private http: HttpClient) { }

    // Saves the username it aquired from the api saved to localstorage.
    saveUserDetail() {
        const session = this.authService.getIdentity();
        if (!session) {
            throw new Error("No JWT present");
        }
        const token = session.access_token;

        const headers = new Headers({
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        });

        const task = fetch("/api/jwt/userDetail", {
            method: "GET",
            headers
        })
            .then(response => response.json())
            .then(data => {
                try {
                    console.log("Data: ", data);
                    localStorage.setItem(this.USERNAME_KEY, data.username);
                    localStorage.setItem(this.USERROLES_KEY, JSON.stringify(data.roles));
                } catch (Error) { }
            });
    }

}
