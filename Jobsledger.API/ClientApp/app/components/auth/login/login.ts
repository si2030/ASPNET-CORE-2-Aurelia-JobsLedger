import { HttpClient } from "aurelia-fetch-client";
import { autoinject, inject, NewInstance } from "aurelia-framework";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from "aurelia-validation";
import { TokenService } from "../tokenService";
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
    private tokenService: TokenService,
    private http: HttpClient,
    private controllerFactory: ValidationControllerFactory
  ) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  submitLogin() {
    const { username, password } = this;

    if (this.controller.validate()) {
console.log("submit login reached!");
    };

    // if (!!username && !!password) {
    //   // or your validations
    //   
    //   //this.tokenService.login({ username, password });
    // }
  }
}

ValidationRules.ensure((v: Login) => v.username)
  .displayName("User Name")
  .required()
  .ensure((v: Login) => v.password)
  .displayName("Password")
  .required()
  .on(Login);
