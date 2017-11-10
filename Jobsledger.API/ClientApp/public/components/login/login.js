var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from "aurelia-fetch-client";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationControllerFactory, ValidationRules } from "aurelia-validation";
import { BootstrapFormRenderer } from "../../../utilities/bootstrapFormRenderer";
import { AuthService } from "../../../auth/auth-service";
var Login = /** @class */ (function () {
    function Login(authService, router, http, controllerFactory) {
        this.authService = authService;
        this.router = router;
        this.http = http;
        this.controllerFactory = controllerFactory;
        this.heading = "Login";
        this.message = "";
        this.username = "";
        this.password = ""; // these are pubic fields available in your view unless you add 'private' in front of them
        this.router = router;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
    }
    Login.prototype.submitLogin = function () {
        if (this.controller.validate()) {
            // "Fetch" JWT and save it to local storage. change root to "app".
            this.authService.login(this.username, this.password);
        }
    };
    Login = __decorate([
        autoinject
        //@inject(NewInstance.of(ValidationController))
        ,
        __metadata("design:paramtypes", [AuthService,
            Router,
            HttpClient,
            ValidationControllerFactory])
    ], Login);
    return Login;
}());
export { Login };
ValidationRules.ensure(function (v) { return v.username; })
    .displayName("User Name")
    .required()
    .ensure(function (v) { return v.password; })
    .displayName("Password")
    .required()
    .on(Login);
//# sourceMappingURL=login.js.map