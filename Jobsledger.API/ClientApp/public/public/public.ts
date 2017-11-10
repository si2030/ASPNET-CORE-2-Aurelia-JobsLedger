import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Redirect, NavigationInstruction, Router, RouterConfiguration, Next } from 'aurelia-router';

@autoinject
export class Public {
    public router: Router;

    configureRouter(config: RouterConfiguration, router: Router): void {
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

    }
}