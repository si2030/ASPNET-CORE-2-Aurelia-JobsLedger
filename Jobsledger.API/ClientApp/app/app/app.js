var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PLATFORM, autoinject } from 'aurelia-framework';
import { AuthService } from '../../auth/auth-service';
//import { test } from '../components/clients/clientList'
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.configureRouter = function (config, router) {
        this.router = router;
        config.title = "Aurelia";
        config.addAuthorizeStep(AuthorizeStep);
        config.map([
            {
                route: ["", "scheduler"],
                name: "scheduler",
                settings: { icon: "scheduler" },
                moduleId: PLATFORM.moduleName("../components/scheduler/scheduler"),
                nav: true,
                title: "scheduler"
            },
            {
                route: 'clients', name: 'clients', moduleId: PLATFORM.moduleName("../components/clients/clientList/clientList"), title: 'Clients', nav: true, settings: {
                    nav: [
                        { href: '#clients/list', title: 'Client List' },
                        { href: '#clients/Create', title: 'Create Client' },
                    ],
                    auth: true
                }
            },
            { route: 'clients/list', name: 'clientList', moduleId: PLATFORM.moduleName("../components/clients/clientList/clientList"), settings: { auth: true } },
            { route: 'clients/create', name: 'aboutTeam', moduleId: PLATFORM.moduleName("../components/clients/clientCreate/clientCreate"), settings: { auth: true } },
        ]);
    };
    App = __decorate([
        autoinject
    ], App);
    return App;
}());
export { App };
var AuthorizeStep = /** @class */ (function () {
    function AuthorizeStep(authService) {
        this.authService = authService;
    }
    AuthorizeStep.prototype.run = function (navigationInstruction, next) {
        var isLoggedIn = false;
        console.log("testAuthentication: ", this.authService.isAuthenticated());
        navigationInstruction
            .getAllInstructions()
            .some(function (i) { return i.config.settings.auth; });
        if (navigationInstruction
            .getAllInstructions()
            .some(function (i) { return i.config.settings.auth; })) {
            console.log("Navgation instruction", navigationInstruction);
            isLoggedIn = this.authService.isAuthenticated();
            //if (!isLoggedIn) {
            //    return next.cancel(new Redirect("scheduler"));
            //}
        }
        return next();
    };
    AuthorizeStep = __decorate([
        autoinject,
        __metadata("design:paramtypes", [AuthService])
    ], AuthorizeStep);
    return AuthorizeStep;
}());
//import { Aurelia, PLATFORM } from 'aurelia-framework';
//import { Router, RouterConfiguration, NavigationInstruction, Redirect, Next } from 'aurelia-router';
//export class App {
//    router: Router;
//    configureRouter(config: RouterConfiguration, router: Router) {
//        config.title = 'Aurelia';
//        config.addAuthorizeStep(AuthorizeStep);
//        config.map([{
//            route: [ '', 'home' ],
//            name: 'home',
//            settings: { icon: 'home' },
//            moduleId: PLATFORM.moduleName('../website/home/home'),
//            nav: true,
//            title: 'Home'
//        }, {
//            route: 'counter',
//            name: 'counter',
//            settings: { icon: 'education' },
//            moduleId: PLATFORM.moduleName('../website/counter/counter'),
//            nav: true,
//            title: 'Counter'
//        }, {
//            route: 'fetch-data',
//            name: 'fetchdata',
//            settings: { icon: 'th-list' },
//            moduleId: PLATFORM.moduleName('../website/fetchdata/fetchdata'),
//            nav: true,
//            title: 'Fetch data'
//        }, {
//            route: 'login',
//            name: 'login',
//            settings: { icon: 'user' },
//            moduleId: PLATFORM.moduleName('../components/auth/login/login'),
//            nav: true,
//            title: 'Login'
//        },
//        ]);
//        this.router = router;
//    }
//}
//class AuthorizeStep {
//    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
//        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
//            var isLoggedIn = false;
//            console.log('It got here!');
//            if (!isLoggedIn) {
//                return next.cancel(new Redirect('login'));
//            }
//        }
//        return next();
//    }
//}
//# sourceMappingURL=app.js.map