var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { PLATFORM, autoinject } from 'aurelia-framework';
var Public = /** @class */ (function () {
    function Public() {
    }
    Public.prototype.configureRouter = function (config, router) {
        this.router = router;
        config.title = "Aurelia";
        config.map([
            {
                route: ["", "home"],
                name: "home",
                settings: { icon: "home" },
                moduleId: PLATFORM.moduleName("../components/home/home"),
                nav: true,
                title: "Home"
            },
            {
                route: "counter",
                name: "counter",
                settings: { icon: "education", auth: false },
                moduleId: PLATFORM.moduleName("../components/counter/counter"),
                nav: true,
                title: "Counter"
            },
            {
                route: "fetch-data",
                name: "fetchdata",
                settings: { icon: "th-list", auth: false },
                moduleId: PLATFORM.moduleName("../components/fetchdata/fetchdata"),
                nav: true,
                title: "Fetch data"
            },
            {
                route: "login",
                name: "login",
                settings: { icon: "user", auth: false, },
                moduleId: PLATFORM.moduleName("../components/login/login"),
                nav: true,
                title: "Login"
            }
        ]);
    };
    Public = __decorate([
        autoinject
    ], Public);
    return Public;
}());
export { Public };
//# sourceMappingURL=public.js.map