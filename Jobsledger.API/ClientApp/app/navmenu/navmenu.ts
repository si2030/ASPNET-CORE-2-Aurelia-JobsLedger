import { autoinject, bindable, bindingMode } from "aurelia-framework";
import { Router } from 'aurelia-router'

import { AuthService } from "../../services/auth/auth-service";

@autoinject
export class Navmenu {
    public userName: string = 'anonymous';
    private userRole: any;


    constructor(public authService: AuthService,
                public router: Router)
    {
        this.userName = this.authService.getUserName();
        this.userRole = this.authService.getUserRole();
    }

    get routes() {

        return this.router.navigation.filter(r => r.settings.roles.indexOf(this.userRole) > -1);
    }

    logout() {
        localStorage.removeItem('origin');
        this.authService.forceReturnToPublic();
    }
}


