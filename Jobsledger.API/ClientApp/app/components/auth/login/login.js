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
import { ValidationControllerFactory, ValidationRules } from "aurelia-validation";
import { TokenService } from "../tokenService";
import { BootstrapFormRenderer } from "../../../utilities/bootstrapFormRenderer";
var Login = /** @class */ (function () {
    function Login(tokenService, http, controllerFactory) {
        this.tokenService = tokenService;
        this.http = http;
        this.controllerFactory = controllerFactory;
        this.heading = "Login";
        this.message = "";
        this.username = "";
        this.password = ""; // these are pubic fields available in your view unless you add 'private' in front of them
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
    }
    Login.prototype.submitLogin = function () {
        var _a = this, username = _a.username, password = _a.password;
        this.controller.validate();
        // if (!!username && !!password) {
        //   // or your validations
        //   console.log("submit login reached!");
        //   //this.tokenService.login({ username, password });
        // }
    };
    Login = __decorate([
        autoinject
        //@inject(NewInstance.of(ValidationController))
        ,
        __metadata("design:paramtypes", [TokenService,
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