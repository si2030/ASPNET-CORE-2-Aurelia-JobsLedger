import { Aurelia, PLATFORM, autoinject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Messages {
    public messageStrong: string;
    public message: string;
    public alertType: string;
    public showMessage: boolean = true;
    public subscription: { dispose: () => void };


    constructor(private eventAggregator: EventAggregator) { };

    attached() {
        this.subscription = this.eventAggregator.subscribe('publicMessages', (publishedMessage) => {
            this.messageStrong = publishedMessage.messageStrong;
            this.message = publishedMessage.message;
            this.alertType = publishedMessage.alertType;

            if (publishedMessage.clear) {
                console.log("publishedMessage.clear from aggregator is true")
                this.showMessage = false;
            } else {
                console.log("publishedMessage.clear from aggregator is false")
                this.showMessage = true;
            }
        });
    }

    detached() {
        this.subscription.dispose();
    }
}

export class MessagePayload {
    messageStrong: string;
    message: string;
    alertType: string;

    constructor(messageStrong: string, message: string, alertType: string, clear?: boolean) {
        this.messageStrong = messageStrong;
        this.message = message;
        this.alertType = alertType;
    }
}