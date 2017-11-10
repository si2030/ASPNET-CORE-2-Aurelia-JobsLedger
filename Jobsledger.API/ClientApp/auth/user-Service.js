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
import { AuthService } from "./auth-service";
var UserService = /** @class */ (function () {
    function UserService(authService, http) {
        this.authService = authService;
        this.http = http;
        this.USERNAME_KEY = "user_name";
        this.USERROLES_KEY = "user_roles";
    }
    // Saves the username it aquired from the api saved to localstorage.
    UserService.prototype.saveUserDetail = function () {
        var _this = this;
        var session = this.authService.getIdentity();
        if (!session) {
            throw new Error("No JWT present");
        }
        var token = session.access_token;
        var headers = new Headers({
            Authorization: "bearer " + token,
            "Content-Type": "application/json; charset=utf-8"
        });
        var task = fetch("/api/jwt/userDetail", {
            method: "GET",
            headers: headers
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            try {
                console.log("Data: ", data);
                localStorage.setItem(_this.USERNAME_KEY, data.username);
                localStorage.setItem(_this.USERROLES_KEY, JSON.stringify(data.roles));
            }
            catch (Error) { }
        });
    };
    UserService = __decorate([
        autoinject,
        __metadata("design:paramtypes", [AuthService, HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user-Service.js.map