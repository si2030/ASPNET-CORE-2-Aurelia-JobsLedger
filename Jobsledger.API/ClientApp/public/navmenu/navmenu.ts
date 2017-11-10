import { autoinject, bindable, bindingMode } from "aurelia-framework";
import { Router } from 'aurelia-router'
import { AuthService } from '../../auth/auth-service'


@autoinject
export class Navmenu {

    public isLoggedIn: boolean = false;
    public userName: string = 'anonymous';

    constructor(public authService: AuthService, public router: Router) {
        this.isLoggedIn = authService.isAuthenticated();
        this.userName = authService.getUserName();
    }
}


