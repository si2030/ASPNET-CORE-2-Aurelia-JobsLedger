import { Aurelia, PLATFORM, autoinject } from "aurelia-framework";
import {
    Redirect,
    NavigationInstruction,
    Router,
    RouterConfiguration,
    Next,
    PipelineProvider
} from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';

import { MessagePayload } from '../../services/messages/messages'
import { AuthService } from "../../services/auth/auth-service";
import { Menu } from './menu'

@autoinject
export class App {
    public router: Router;
    private TOKEN_KEY = "session";

    constructor(private menu: Menu, private authService: AuthService) { }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.title = "Aurelia";
        config.addAuthorizeStep(AuthorizeStep);

        config.map(this.menu.userMenu(this.authService.getUserName(), this.authService.getUserRole()));

        //config.map(this.menu.menuList());

        config.mapUnknownRoutes("not-found");
    }
}

@autoinject
class AuthorizeStep {
    private endDate: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private aurelia: Aurelia,
        private pipelineProvider: PipelineProvider,
        private eventAggregator: EventAggregator
    ) { }

    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        return Promise.resolve()
            .then(() => this.eventAggregator.publish("messages", new MessagePayload("","","")))
            .then(() => this.checkSessionExists(navigationInstruction, next))
            .then(() => this.checkAuthentication(navigationInstruction, next))
            .then(() => this.checkAuthorization(navigationInstruction, next))
            .then(result => result || next());

    }
    checkSessionExists(navigationInstruction: NavigationInstruction, next: Next) {
        const session = this.authService.hasIdentity();
        if (!session) {
            this.authService.forceReturnToPublic()
        }
    }

    checkAuthentication(navigationInstruction: NavigationInstruction, next: Next) {
        if (this.authService.hasTokenExpired()) {
            this.saveCurrentLocation(navigationInstruction);
            this.authService.forceReturnToPublic();
        }
    }

    checkAuthorization(navigationInstruction: NavigationInstruction, next: Next) {
        const usersRole = this.authService.getUserRole();

        const requiredRoles = navigationInstruction
            .getAllInstructions()
            .map(i => i.config.settings.roles)[0];

        const isUserPermited = requiredRoles ? requiredRoles.some(r => r === usersRole) : true;
        if (!isUserPermited) {
            // TODO MESSAGE USER THAT THIS IS NOT PERMITTED FOR THIS AUTH.
            return next.cancel(new Redirect('scheduler'));
        }
    }

    saveCurrentLocation(navigationInstruction: NavigationInstruction) {
        const currentUrl = navigationInstruction.fragment + (navigationInstruction.queryString ? `?${navigationInstruction.queryString}` : '');
        localStorage.setItem('origin', currentUrl);
    }
}
