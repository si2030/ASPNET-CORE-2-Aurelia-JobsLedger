import { HttpClient } from "aurelia-fetch-client";
import { autoinject, inject, NewInstance } from "aurelia-framework";
import { Router } from "aurelia-router";
import {
    ValidationControllerFactory,
    ValidationController,
    ValidationRules
} from "aurelia-validation";
import { TokenService } from "../tokenService";
import { UserService } from "../userService";
import { BootstrapFormRenderer } from "../../../utilities/bootstrapFormRenderer";
import { LoggedInService } from "../LoggedInService";

@autoinject
export class Login {
    //loggedInService: LoggedInService;
    controller: ValidationController;
    heading: string = "Login";
    message = "";
    username: string = "";
    password: string = ""; // these are pubic fields available in your view unless you add 'private' in front of them

    constructor(
        private login: userLogin,
        private loggedInService: LoggedInService,
        private tokenService: TokenService,
        private userService: UserService,
        private router: Router,
        private http: HttpClient,
        private controllerFactory: ValidationControllerFactory
    ) {
        this.router = router;
        this.loggedInService = loggedInService;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());

        // Check if user is logged in
        if (this.loggedInService.isAuthenticated()) {
            console.log('gets here!')
            loggedInService.isLoggedIn = true;
            loggedInService.userName = this.userService.getUserName();

            console.log(" this.loggedInService.isLoggedIn IN constructor", this.loggedInService.isLoggedIn);
            console.log(" this.loggedInService.userName IN constructor", this.loggedInService.userName)
        };

    }


    submitLogin() {
        if (this.controller.validate()) {

            // Lets do a fetch!
            this.login.Username = this.username;
            this.login.Password = this.password;

            const task = fetch("/api/jwt", {
                method: "POST",
                body: JSON.stringify(this.login),
                headers: new Headers({ 'content-type': 'application/json' })
            })
                .then(response => response.json())
                .then(data => {
                    // First save the JWT and as well save it to loggedInService.
                    this.loggedInService.isLoggedIn = this.tokenService.saveJWT(data);

                    // Next go back to the api and get the username and save that to loggedInService also.
                    this.loggedInService.userName = this.userService.saveUserName();

                    // Finally redirect to home page.
                    this.router.navigate("home");
                })
                .catch(error => {
                    this.tokenService.clearJWT();
                });
            console.log(" this.loggedInService.isLoggedIn after FETCH", this.loggedInService.isLoggedIn);
            console.log(" this.loggedInService.userName after FETCH", this.loggedInService.userName)
        }
    }
}

interface userLogin {
    Username: string;
    Password: string;
}

ValidationRules.ensure((v: Login) => v.username)
    .displayName("User Name")
    .required()
    .ensure((v: Login) => v.password)
    .displayName("Password")
    .required()
    .on(Login);
