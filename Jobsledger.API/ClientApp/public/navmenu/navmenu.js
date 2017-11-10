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
import { AuthService } from '../../auth/auth-service';
var Navmenu = /** @class */ (function () {
    function Navmenu(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isLoggedIn = false;
        this.userName = 'anonymous';
        this.isLoggedIn = authService.isAuthenticated();
        this.userName = authService.getUserName();
    }
    Navmenu = __decorate([
        autoinject,
        __metadata("design:paramtypes", [AuthService, Router])
    ], Navmenu);
    return Navmenu;
}());
export { Navmenu };
//# sourceMappingURL=navmenu.js.map