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
        this.username = "anonymous";
        this.tokenService = tokenService;
    }
    // Saves the username it aquired from the api after saving it to localstorage.
    UserService.prototype.saveUserName = function () {
        var _this = this;
        var jwt = this.tokenService.getJWT();
        if (!jwt) {
            return "anonymous";
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
                console.log("Data on userService.ts: ", data);
                localStorage.setItem(_this.USERNAME_KEY, data.username);
                return data.userName;
            }
            catch (Error) {
                return null;
            }
        });
        return this.username;
    };
    // Goes to localstorage and if the username is there returns it.
    UserService.prototype.getUserName = function () {
        var username = localStorage.getItem(this.USERNAME_KEY);
        console.log("username in userService.getusername: ", username);
        if (username) {
            return username;
        }
        else {
            return "anonymous";
        }
    };
    UserService = __decorate([
        autoinject,
        __metadata("design:paramtypes", [TokenService,
            HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=userService.js.map