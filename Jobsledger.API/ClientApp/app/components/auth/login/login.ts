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

@autoinject
//@inject(NewInstance.of(ValidationController))
export class Login {
  controller: ValidationController;
  heading: string = "Login";
  message = "";
  username: string = "";
  password: string = ""; // these are pubic fields available in your view unless you add 'private' in front of them

  constructor(
    private login: userLogin,
    private tokenService: TokenService,
    private userService: UserService,
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
      // Lets do a fetch!

      this.login.Username = this.username;
      this.login.Password = this.password;

      const task = fetch("/api/jwt", {
        method: "POST",
        body: JSON.stringify(this.login),
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.tokenService.saveJWT(data);
          this.userService.saveUserName();
          this.router.navigate("home");
        })
        .catch(error => {
          this.tokenService.clearJWT();
        });
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
