import { Aurelia, PLATFORM, autoinject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';

import { AuthService } from "../../../services/auth/auth-service"
import { Messages, MessagePayload } from '../../../services/messages/messages'

@autoinject
export class Home {

    constructor(private eventAggregator: EventAggregator) { }

    secondTestAggregator() {
        this.eventAggregator.publish('messages', new MessagePayload("Strong Detail", "Updated test message", "success"));
    }
}
