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
import { LoggedInService } from "../LoggedInService";
var Login = /** @class */ (function () {
    function Login(login, loggedInService, tokenService, userService, router, http, controllerFactory) {
        this.login = login;
        this.loggedInService = loggedInService;
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
        this.loggedInService = loggedInService;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
        // Check if user is logged in
        if (this.loggedInService.isAuthenticated()) {
            console.log('gets here!');
            loggedInService.isLoggedIn = true;
            loggedInService.userName = this.userService.getUserName();
            console.log(" this.loggedInService.isLoggedIn IN constructor", this.loggedInService.isLoggedIn);
            console.log(" this.loggedInService.userName IN constructor", this.loggedInService.userName);
        }
        ;
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
                headers: new Headers({ 'content-type': 'application/json' })
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                // First save the JWT and as well save it to loggedInService.
                _this.loggedInService.isLoggedIn = _this.tokenService.saveJWT(data);
                // Next go back to the api and get the username and save that to loggedInService also.
                _this.loggedInService.userName = _this.userService.saveUserName();
                // Finally redirect to home page.
                _this.router.navigate("home");
            })
                .catch(function (error) {
                _this.tokenService.clearJWT();
            });
            console.log(" this.loggedInService.isLoggedIn after FETCH", this.loggedInService.isLoggedIn);
            console.log(" this.loggedInService.userName after FETCH", this.loggedInService.userName);
        }
    };
    Login = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Object, LoggedInService,
            TokenService,
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