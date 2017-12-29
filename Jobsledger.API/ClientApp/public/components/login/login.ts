import { HttpClient } from "aurelia-fetch-client";
import { autoinject, inject, NewInstance, PLATFORM } from "aurelia-framework";
import { Router } from "aurelia-router";
import {
    ValidationControllerFactory,
    ValidationController,
    ValidationRules
} from "aurelia-validation";
import { BootstrapFormRenderer } from "../../../services/bootstrapFormRenderer/bootstrapFormRenderer";

import { AuthService } from "../../../services/auth/auth-service"

@autoinject
export class Login {
    [x: string]: any;
    controller: ValidationController;
    heading: string = "Login";
    message = "";
    username: string = "";
    password: string = ""; // these are pubic fields available in your view unless you add 'private' in front of them

    constructor(
        private authService: AuthService,
        private router: Router,
        private http: HttpClient,
        private controllerFactory: ValidationControllerFactory
    ) {
        this.router = router;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
    }

    submitLogin() {
        if (this.controller.validate()) {
            // "Fetch" JWT and save it to local storage. change root to "app".
            this.authService.login(this.username, this.password);
        }
    }
}

ValidationRules.ensure((v: Login) => v.username)
    .displayName("User Name")
    .required()
    .ensure((v: Login) => v.password)
    .displayName("Password")
    .required()
    .on(Login);
