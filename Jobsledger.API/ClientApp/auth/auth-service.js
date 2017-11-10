var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Aurelia } from 'aurelia-framework';
import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
var AuthService = /** @class */ (function () {
    function AuthService(userLogin, aurelia, http, router) {
        this.userLogin = userLogin;
        this.aurelia = aurelia;
        this.http = http;
        this.router = router;
        this.session = null;
        this.TOKEN_KEY = "session";
        this.LOGGED_IN = "loggedIn";
        this.USERNAME_KEY = "user_name";
        this.USERROLES_KEY = "user_roles";
        this.session = this.hasIdentity();
    }
    // We use this in the boot.ts file to determine if we have a session object.
    AuthService.prototype.isAuthenticated = function () {
        return this.session !== null;
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        this.userLogin.Username = username;
        this.userLogin.Password = password;
        // Lets do a fetch!
        var task = fetch("/api/jwt", {
            method: "POST",
            body: JSON.stringify(this.userLogin),
            headers: new Headers({ 'content-type': 'application/json' })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            localStorage.setItem(_this.TOKEN_KEY, JSON.stringify(data));
            localStorage.setItem(_this.LOGGED_IN, JSON.stringify("authenticated"));
            _this.saveUserDetail();
        })
            .catch(function (error) {
            _this.clearIdentity();
        });
        this.router.navigate('/', { replace: true, trigger: false });
        this.router.reset();
        this.aurelia.setRoot('../app/app/app');
    };
    ;
    AuthService.prototype.logout = function () {
        this.router.navigate('/', { replace: true, trigger: false });
        this.aurelia.setRoot('public/public/public');
    };
    ;
    AuthService.prototype.hasIdentity = function () {
        this.sessionJson = localStorage.getItem(this.TOKEN_KEY);
        return JSON.parse(this.sessionJson || null);
    };
    ;
    AuthService.prototype.getIdentity = function () {
        this.sessionJson = localStorage.getItem(this.TOKEN_KEY);
        if (this.sessionJson) {
            var token = JSON.parse(this.sessionJson);
            return token;
        }
        else {
            return null;
        }
    };
    ;
    AuthService.prototype.clearIdentity = function () {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.LOGGED_IN);
            localStorage.removeItem(this.USERNAME_KEY);
            localStorage.removeItem(this.USERROLES_KEY);
        }
        catch (Error) {
            return false;
        }
        return true;
    };
    //  Get both the user name and their roles as 'detail' and save it to local storage.
    AuthService.prototype.saveUserDetail = function () {
        var _this = this;
        var session = this.getIdentity();
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
                console.log("data.stringify: ", JSON.stringify(data));
                localStorage.setItem(_this.USERNAME_KEY, data.username);
                localStorage.setItem(_this.USERROLES_KEY, JSON.stringify(data.roles));
            }
            catch (Error) { }
        });
    };
    AuthService.prototype.saveJWT = function (jwt) {
        var tokenJson;
        tokenJson = JSON.stringify(jwt);
        try {
            localStorage.setItem(this.TOKEN_KEY, tokenJson);
            localStorage.setItem(this.LOGGED_IN, "true");
        }
        catch (Error) {
            return false;
        }
        return true;
    };
    // Goes to localstorage and if the username is there returns it.
    AuthService.prototype.getUserName = function () {
        var usernameJson = localStorage.getItem(this.USERNAME_KEY);
        if (this.usernameJson) {
            var userName = JSON.parse(this.usernameJson);
            return userName;
        }
        else {
            return 'anonymous';
        }
    };
    AuthService = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Object, Aurelia,
            HttpClient,
            Router])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth-service.js.map