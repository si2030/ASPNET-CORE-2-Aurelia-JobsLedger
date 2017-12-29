var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Aurelia, autoinject } from "aurelia-framework";
import { Redirect, Router, PipelineProvider } from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';
import { MessagePayload } from '../../services/messages/messages';
import { AuthService } from "../../services/auth/auth-service";
import { Menu } from './menu';
var App = /** @class */ (function () {
    function App(menu, authService) {
        this.menu = menu;
        this.authService = authService;
        this.TOKEN_KEY = "session";
    }
    App.prototype.configureRouter = function (config, router) {
        this.router = router;
        config.title = "Aurelia";
        config.addAuthorizeStep(AuthorizeStep);
        config.map(this.menu.userMenu(this.authService.getUserName(), this.authService.getUserRole()));
        //config.map(this.menu.menuList());
        config.mapUnknownRoutes("not-found");
    };
    App = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Menu, AuthService])
    ], App);
    return App;
}());
export { App };
var AuthorizeStep = /** @class */ (function () {
    function AuthorizeStep(authService, router, aurelia, pipelineProvider, eventAggregator) {
        this.authService = authService;
        this.router = router;
        this.aurelia = aurelia;
        this.pipelineProvider = pipelineProvider;
        this.eventAggregator = eventAggregator;
    }
    AuthorizeStep.prototype.run = function (navigationInstruction, next) {
        var _this = this;
        return Promise.resolve()
            .then(function () { return _this.eventAggregator.publish("messages", new MessagePayload("", "", "")); })
            .then(function () { return _this.checkSessionExists(navigationInstruction, next); })
            .then(function () { return _this.checkAuthentication(navigationInstruction, next); })
            .then(function () { return _this.checkAuthorization(navigationInstruction, next); })
            .then(function (result) { return result || next(); });
    };
    AuthorizeStep.prototype.checkSessionExists = function (navigationInstruction, next) {
        var session = this.authService.hasIdentity();
        if (!session) {
            this.authService.forceReturnToPublic();
        }
    };
    AuthorizeStep.prototype.checkAuthentication = function (navigationInstruction, next) {
        if (this.authService.hasTokenExpired()) {
            this.saveCurrentLocation(navigationInstruction);
            this.authService.forceReturnToPublic();
        }
    };
    AuthorizeStep.prototype.checkAuthorization = function (navigationInstruction, next) {
        var usersRole = this.authService.getUserRole();
        var requiredRoles = navigationInstruction
            .getAllInstructions()
            .map(function (i) { return i.config.settings.roles; })[0];
        var isUserPermited = requiredRoles ? requiredRoles.some(function (r) { return r === usersRole; }) : true;
        if (!isUserPermited) {
            // TODO MESSAGE USER THAT THIS IS NOT PERMITTED FOR THIS AUTH.
            return next.cancel(new Redirect('scheduler'));
        }
    };
    AuthorizeStep.prototype.saveCurrentLocation = function (navigationInstruction) {
        var currentUrl = navigationInstruction.fragment + (navigationInstruction.queryString ? "?" + navigationInstruction.queryString : '');
        localStorage.setItem('origin', currentUrl);
    };
    AuthorizeStep = __decorate([
        autoinject,
        __metadata("design:paramtypes", [AuthService,
            Router,
            Aurelia,
            PipelineProvider,
            EventAggregator])
    ], AuthorizeStep);
    return AuthorizeStep;
}());
//# sourceMappingURL=app.js.map