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
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from "../../../services/auth/auth-service";
import { MessagePayload } from '../../../services/messages/messages';
import { Menu } from '../../app/menu';
var Scheduler = /** @class */ (function () {
    function Scheduler(authService, fullMenu, eventAggregator) {
        this.authService = authService;
        this.fullMenu = fullMenu;
        this.eventAggregator = eventAggregator;
        this.authService = this.authService;
    }
    Scheduler.prototype.testArray = function () {
        console.log("getsHere");
        this.fullMenu.userMenu(this.authService.getUserName(), this.authService.getUserRole());
    };
    Scheduler.prototype.secondTestAggregator = function () {
        this.eventAggregator.publish('messages', new MessagePayload("Strong Detail", "Updated test message", "success"));
    };
    Scheduler = __decorate([
        autoinject,
        __metadata("design:paramtypes", [AuthService,
            Menu,
            EventAggregator])
    ], Scheduler);
    return Scheduler;
}());
export { Scheduler };
//# sourceMappingURL=scheduler.js.map