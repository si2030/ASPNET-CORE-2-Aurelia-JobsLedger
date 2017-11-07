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
import { TokenService } from "./tokenService";
var UserService = /** @class */ (function () {
    function UserService(tokenService, http) {
        this.tokenService = tokenService;
        this.http = http;
        //private tokenService: TokenService;
        this.USERNAME_KEY = "user_name";
        this.tokenService = tokenService;
    }
    // Saves the username it aquired from the api saved to localstorage.
    UserService.prototype.saveUserName = function () {
        var _this = this;
        var jwt = this.tokenService.getJWT();
        if (!jwt) {
            throw new Error("No JWT present");
        }
        var token = jwt.access_token;
        var headers = new Headers({
            Authorization: "bearer " + token,
            "Content-Type": "application/json; charset=utf-8"
        });
        var task = fetch("/api/jwt/userName", {
            method: "GET",
            headers: headers
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            try {
                console.log("Data: ", data);
                localStorage.setItem(_this.USERNAME_KEY, data.username);
            }
            catch (Error) { }
        });
    };
    // Goes to localstorage and if the username is there returns it.
    UserService.prototype.getUserName = function () {
        this.usernameJson = localStorage.getItem(this.USERNAME_KEY);
        if (this.usernameJson) {
            var userName = JSON.parse(this.usernameJson);
            return userName;
        }
        else {
            return null;
        }
    };
    UserService = __decorate([
        autoinject,
        __metadata("design:paramtypes", [TokenService, HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=userService.js.map