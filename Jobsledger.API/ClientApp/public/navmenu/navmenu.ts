import { autoinject, bindable, bindingMode } from "aurelia-framework";
import { Router } from 'aurelia-router'


@autoinject
export class Navmenu {

    constructor(public router: Router) {

    }
}


