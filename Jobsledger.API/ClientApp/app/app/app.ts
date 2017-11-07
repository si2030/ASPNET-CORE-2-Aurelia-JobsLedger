import { Aurelia, PLATFORM, autoinject } from "aurelia-framework";
import {
  Redirect,
  NavigationInstruction,
  Router,
  RouterConfiguration,
  Next
} from "aurelia-router";
import { LoggedInService } from "../components/auth/LoggedInService";

@autoinject
export class App {
  public router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = "Aurelia";

    config.map([
      {
        route: ["", "home"],
        name: "home",
        settings: { icon: "home" },
        moduleId: PLATFORM.moduleName("../website/home/home"),
        nav: true,
        title: "Home"
      },
      //{
      //  route: "counter",
      //  name: "counter",
      //  settings: { icon: "education" },
      //  moduleId: PLATFORM.moduleName("../website/counter/counter"),
      //  nav: true,
      //  title: "Counter"
      //},
      //{
      //  route: "fetch-data",
      //  name: "fetchdata",
      //  settings: { icon: "th-list", auth: true },
      //  moduleId: PLATFORM.moduleName("../website/fetchdata/fetchdata"),
      //  nav: true,
      //  title: "Fetch data"
      //},
      {
            route: 'about', name: 'about', moduleId: PLATFORM.moduleName("../website/home/home"), title: 'About', nav: true, settings: {
              nav: [
                  { href: '#about/services', title: 'Services' },
                  { href: '#about/team', title: 'Team' },
                  { href: '#about/contact', title: 'Contact' }
                ],
              auth: true,
          }
      },
      { route: 'about/services', name: 'aboutServices', moduleId: PLATFORM.moduleName("../website/fetchdata/fetchdata"), },
      { route: 'about/team', name: 'aboutTeam', moduleId: PLATFORM.moduleName("../website/counter/counter"), },
      { route: 'about/contact', name: 'aboutContact', moduleId: PLATFORM.moduleName("../components/auth/login/login"), },


      {
        route: "login",
        name: "login",
        settings: { icon: "user", auth: true, },
        moduleId: PLATFORM.moduleName("../components/auth/login/login"),
        nav: true,
        title: "Login"
      }
    ]);

    config.addAuthorizeStep(AuthorizeStep);
  }
}

@autoinject
class AuthorizeStep {
  testAuthentication: LoggedInService;

  constructor(testAuthentication: LoggedInService) {
    this.testAuthentication = testAuthentication;
  }

  run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
    var isLoggedIn: boolean = false;

    if (
      navigationInstruction
        .getAllInstructions()
        .some(i => i.config.settings.auth)
    ) {
      isLoggedIn = this.testAuthentication.isAuthenticated();
      console.log(
        "testAuthentication: ",
        this.testAuthentication.isAuthenticated()
      );

      if (!isLoggedIn) {
        return next.cancel(new Redirect("login"));
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
