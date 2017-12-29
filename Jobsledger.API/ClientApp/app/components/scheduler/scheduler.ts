import { Aurelia, PLATFORM, autoinject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';

import { AuthService } from "../../../services/auth/auth-service"
import { Messages, MessagePayload } from '../../../services/messages/messages'
import { Menu } from '../../app/menu'


@autoinject
export class Scheduler {
    public menu: any;
  
    constructor(public authService: AuthService,
        private fullMenu: Menu,
        private eventAggregator: EventAggregator) {
        this.authService = this.authService;
    }

    testArray() {
        console.log("getsHere");

        this.fullMenu.userMenu(this.authService.getUserName(), this.authService.getUserRole())
    }


    secondTestAggregator() {
        this.eventAggregator.publish('messages', new MessagePayload("Strong Detail", "Updated test message", "success"));
    }
}
