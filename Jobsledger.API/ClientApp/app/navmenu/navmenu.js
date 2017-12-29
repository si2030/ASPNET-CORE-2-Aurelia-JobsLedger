var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { AuthService } from "../../services/auth/auth-service";
var Navmenu = /** @class */ (function () {
    function Navmenu(authService, router) {
        this.authService = authService;
        this.router = router;
        this.userName = 'anonymous';
        this.userName = this.authService.getUserName();
        this.userRole = this.authService.getUserRole();
    }
    Object.defineProperty(Navmenu.prototype, "routes", {
        get: function () {
            var _this = this;
            return this.router.navigation.filter(function (r) { return r.settings.roles.indexOf(_this.userRole) > -1; });
        },
        enumerable: true,
        configurable: true
    });
    Navmenu.prototype.logout = function () {
        localStorage.removeItem('origin');
        this.authService.forceReturnToPublic();
    };
    Navmenu = __decorate([
        autoinject,
        __metadata("design:paramtypes", [AuthService,
            Router])
    ], Navmenu);
    return Navmenu;
}());
export { Navmenu };
//# sourceMappingURL=navmenu.js.map