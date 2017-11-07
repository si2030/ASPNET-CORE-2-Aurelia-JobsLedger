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
import { TokenService } from "../tokenService";
import { UserService } from "../userService";
import { BootstrapFormRenderer } from "../../../utilities/bootstrapFormRenderer";
var Login = /** @class */ (function () {
    function Login(login, tokenService, userService, router, http, controllerFactory) {
        this.login = login;
        this.tokenService = tokenService;
        this.userService = userService;
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
        var _this = this;
        if (this.controller.validate()) {
            // Lets do a fetch!
            this.login.Username = this.username;
            this.login.Password = this.password;
            var task = fetch("/api/jwt", {
                method: "POST",
                body: JSON.stringify(this.login),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.tokenService.saveJWT(data);
                _this.userService.saveUserName();
                _this.router.navigate("home");
            })
                .catch(function (error) {
                _this.tokenService.clearJWT();
            });
        }
    };
    Login = __decorate([
        autoinject
        //@inject(NewInstance.of(ValidationController))
        ,
        __metadata("design:paramtypes", [Object, TokenService,
            UserService,
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