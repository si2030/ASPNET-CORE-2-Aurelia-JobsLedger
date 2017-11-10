import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Redirect, NavigationInstruction, Router, RouterConfiguration, Next } from 'aurelia-router';

import { AuthService } from '../../auth/auth-service'
//import { test } from '../components/clients/clientList'
@autoinject
export class App {
    public router: Router;

    configureRouter(config: RouterConfiguration, router: Router): void {
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


            //{
            //    route: "logout",
            //    name: "logout",
            //    settings: { icon: "user", auth: false, },
            //    moduleId: PLATFORM.moduleName("../components/auth/logout/logout"),
            //    nav: true,
            //    title: "Logout"
            //}
        ]);

    }
}

@autoinject
class AuthorizeStep {
   
    constructor(private authService: AuthService) {

    }

    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        var isLoggedIn: boolean = false;
        console.log(
            "testAuthentication: ",
            this.authService.isAuthenticated());

        navigationInstruction
            .getAllInstructions()
            .some(i => i.config.settings.auth);
        if (
            navigationInstruction
                .getAllInstructions()
                .some(i => i.config.settings.auth)
        ) {
        console.log("Navgation instruction", navigationInstruction)
            isLoggedIn = this.authService.isAuthenticated();

            if (!isLoggedIn) {
                return next.cancel(new Redirect("scheduler"));
            }
        }

        return next();
    }
}










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
