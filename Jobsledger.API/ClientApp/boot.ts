import "isomorphic-fetch";
import { Aurelia, PLATFORM } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build
//import { Public } from './public/public/public'
import { AuthService } from "./auth/auth-service"

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName("aurelia-validation"));

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    new HttpClient().configure(config => {
        const baseUrl = document.getElementsByTagName("base")[0].href;
        config.withBaseUrl(baseUrl);
    });

    // After starting the aurelia, we can request the AuthService directly
    // from the DI container on the aurelia object. We can then set the 
    // correct root by querying the AuthService's isAuthenticated method.
    aurelia.start().then(() => {
        var auth = aurelia.container.get(AuthService);
        let root: string = auth.isAuthenticated() ? PLATFORM.moduleName('app/app/app') : PLATFORM.moduleName('public/public/public');

        aurelia.setRoot(root, document.body)
    });

    //var auth = aurelia.container.get(AuthService);
    //let authenticated = auth.isAuthenticated();
    //console.log("authenticated: ", authenticated);


    //if (authenticated) {
    //    aurelia
    //        .start()
    //        .then(function () { return aurelia.setRoot(PLATFORM.moduleName("app/app/app")); });
    //} else {
    //    aurelia
    //        .start()
    //        .then(function () { return aurelia.setRoot(PLATFORM.moduleName("public/public/public")); });
    //}
    //var testRoot: string = 'public/public/public'
    //console.log("PLATFORM.moduleName(\"app/app/app\"", PLATFORM.moduleName("public/public/public"));
    //aurelia
    //    .start()
    //    .then(function () { return aurelia.setRoot(PLATFORM.moduleName(testRoot)); });
}
