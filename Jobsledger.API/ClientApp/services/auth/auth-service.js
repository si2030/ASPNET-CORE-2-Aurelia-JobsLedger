var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Aurelia, PLATFORM, autoinject } from "aurelia-framework";
import { Router, PipelineProvider } from "aurelia-router";
import { HttpClient } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MessagePayload } from '../../services/messages/messages';
var AuthService = /** @class */ (function () {
    function AuthService(userLogin, http, router, aurelia, pipelineProvider, eventAggregator) {
        this.userLogin = userLogin;
        this.http = http;
        this.router = router;
        this.aurelia = aurelia;
        this.pipelineProvider = pipelineProvider;
        this.eventAggregator = eventAggregator;
        this.session = false;
        this.TOKEN_KEY = "session";
    }
    AuthService.prototype.checkJWTStatus = function () {
        var session = localStorage.getItem(this.TOKEN_KEY);
        if (!session) {
            return "noSession";
        }
        if (this.hasTokenExpired()) {
            return "expiredSession";
        }
        return "sessionOK";
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
        })
            .then(function () {
            var origin = localStorage.getItem('origin'); // Save origin BEFORE we reset so we can navigate to it later.
            return Promise.resolve()
                .then(function () { return _this.pipelineProvider.reset(); })
                .then(function () { return _this.router.navigate("/", { replace: true, trigger: false }); })
                .then(function () { return _this.router.reset(); })
                .then(function () { return _this.aurelia.setRoot(PLATFORM.moduleName('app/app/app'))
                .then(function () {
                if (origin) {
                    localStorage.removeItem('origin');
                    _this.router.navigate(origin);
                }
            }); })
                .then(function () { return _this.eventAggregator.publish('messages', new MessagePayload("You have been logged  back in", "", "success")); });
        })
            .catch(function (error) {
            console.log('catch error', error);
            _this.clearIdentity();
        });
    };
    ;
    AuthService.prototype.splitToken = function () {
        this.sessionJson = localStorage.getItem(this.TOKEN_KEY);
        if (this.sessionJson) {
            var base64Url = JSON.parse(this.sessionJson).access_token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var token = JSON.parse(window.atob(base64));
            return token;
        }
        else {
            return null;
        }
    };
    AuthService.prototype.hasIdentity = function () {
        this.sessionJson = localStorage.getItem(this.TOKEN_KEY);
        if (this.sessionJson) {
            return true;
        }
        else {
            return false;
        }
    };
    ;
    AuthService.prototype.clearIdentity = function () {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
        }
        catch (Error) {
            return false;
        }
        return true;
    };
    AuthService.prototype.getUserRole = function () {
        var token = this.splitToken();
        for (var key in token) {
            if (key.includes('role')) {
                return token[key];
            }
        }
    };
    AuthService.prototype.getUserName = function () {
        var token = this.splitToken();
        for (var key in token) {
            if (key.includes('name')) {
                return token[key];
            }
        }
    };
    AuthService.prototype.hasTokenExpired = function () {
        if ((this.splitToken().exp - Math.floor(Date.now() / 1000)) < 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.forceReturnToPublic = function () {
        var _this = this;
        console.log("forceReturnToPublic()");
        return Promise.resolve()
            .then(function () { return _this.pipelineProvider.reset(); })
            .then(function () { return _this.clearIdentity(); })
            .then(function () { return _this.router.navigate("/", { replace: true, trigger: false }); })
            .then(function () { return _this.router.reset(); })
            .then(function () { return _this.aurelia.setRoot(PLATFORM.moduleName('public/public/public'))
            .then(function () {
            var origin = localStorage.getItem('origin');
            if (origin) {
                _this.router.navigate('login');
                _this.eventAggregator.publish('messages', new MessagePayload("Your session has expired.", "Login again to return back to your page.", "warning"));
            }
            else {
                _this.eventAggregator.publish('messages', new MessagePayload("You have been logged out.", "", "success"));
            }
        }); });
    };
    AuthService = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Object, HttpClient,
            Router,
            Aurelia,
            PipelineProvider,
            EventAggregator])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//private LOGGED_IN = "loggedIn";
//private USERNAME_KEY = "user_name";
//private USERROLES_KEY = "user_role"
//isAuthenticated(): boolean {
//    this.session = this.hasIdentity();
//    console.log("SESSION - ISAUTHENTICATED: ", this.session);
//    if (this.session) {
//        return true;
//    } else {
//        return false;
//    }
//}
// We use this in the boot.ts file to determine if we have a session object.
//    // Goes to localstorage and if the username is there returns it.
//    getUserName(): string {
//        var username = localStorage.getItem(this.USERNAME_KEY);
//        console.log("Username from local storage: ", username);
//        if (username) {
//            return username;
//        } else {
//            return 'anonymous';
//        };
//    }
//    // Goes to localstorage and if roles exist returns them.
//    getUserRole(): any {
//        var userRole = localStorage.getItem(this.USERROLES_KEY);
//        if (userRole) {
//            return userRole;
//        } else {
//            return null;
//        }
//    }
//}
////  Get both the user name and their roles as 'detail' and save it to local storage.
//saveUserDetail(): any {
//    const session = this.getIdentity();
//    if (!session) {
//        throw new Error("No JWT present");
//    }
//    const token = session.access_token;
//    const headers = new Headers({
//        Authorization: `bearer ${token}`,
//        "Content-Type": "application/json; charset=utf-8"
//    });
//    const task = fetch("/api/jwt/userDetail", {
//        method: "GET",
//        headers
//    })
//        .then(response => response.json())
//        .then(data => {
//            try {
//                console.log("data.stringify: ", JSON.stringify(data));
//                localStorage.setItem(this.USERNAME_KEY, data.username);
//                localStorage.setItem(this.USERROLES_KEY, data.role);
//            } catch (Error) { }
//            console.log("localStorage.getItem(this.USERNAME_KEY): ", localStorage.getItem(this.USERNAME_KEY));
//        });
//    return task;
//}
//getIdentity(): any {
//    this.sessionJson = localStorage.getItem(this.TOKEN_KEY);
//    if (this.sessionJson) {
//        const token = JSON.parse(this.sessionJson);
//        return token;
//    } else {
//        return null;
//    }
//};
//# sourceMappingURL=auth-service.js.map