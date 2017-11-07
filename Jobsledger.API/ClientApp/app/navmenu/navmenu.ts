import { autoinject, inject, NewInstance } from "aurelia-framework";
import { LoggedInService } from "../components/auth/LoggedInService";

@autoinject
export class Navmenu {

    constructor(private authorized: LoggedInService) {
    }


}
