import "isomorphic-fetch";
import { PLATFORM } from "aurelia-framework";
import { Router } from "aurelia-router";
import { HttpClient } from "aurelia-fetch-client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { AuthService } from "./services/auth/auth-service";
export function configure(aurelia, router) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName("aurelia-validation"))
        .plugin(PLATFORM.moduleName("aurelia-event-aggregator"));
    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }
    new HttpClient().configure(function (config) {
        var baseUrl = document.getElementsByTagName("base")[0].href;
        config.withBaseUrl(baseUrl);
    });
    // After starting the aurelia, we can request the AuthService directly
    // from the DI container on the aurelia object. We can then set the 
    // correct root by querying the AuthService's checkJWTStatus() method
    // to determine if the JWT exists and is valid.
    aurelia.start().then(function () {
        var auth = aurelia.container.get(AuthService);
        var router = aurelia.container.get(Router);
        switch (auth.checkJWTStatus()) {
            case "noSession":
                aurelia.setRoot(PLATFORM.moduleName('public/public/public'), document.body);
                break;
            case "expiredSession":
                aurelia.setRoot(PLATFORM.moduleName('public/public/public'), document.body);
                auth.clearIdentity();
                location.assign("#/login");
                break;
            case "sessionOK":
                aurelia.setRoot(PLATFORM.moduleName('app/app/app'), document.body);
                break;
            default:
                aurelia.setRoot(PLATFORM.moduleName('public/public/public'), document.body);
        }
        //console.log("BOOT!");
        //let root: string = auth.checkJWTStatus() ? PLATFORM.moduleName('app/app/app') : PLATFORM.moduleName('public/public/public');
        //aurelia.setRoot(root, document.body)
    });
}
//# sourceMappingURL=boot.js.map