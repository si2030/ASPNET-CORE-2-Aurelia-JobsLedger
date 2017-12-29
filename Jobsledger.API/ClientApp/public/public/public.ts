import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import {
    Redirect,
    NavigationInstruction,
    Router,
    RouterConfiguration,
    Next,
    PipelineProvider
} from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';


import { Messages, MessagePayload } from '../../services/messages/messages'

@autoinject
export class Public {
    public router: Router;

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.title = "Aurelia";
        config.addPostRenderStep(PostRenderStep);


        config.map([
            {
                route: ["", "home"],
                name: "home",
                settings: { icon: "home" },
                moduleId: PLATFORM.moduleName("../components/home/home"),
                nav: true,
                title: "Home"
            },
            {
                route: "counter",
                name: "counter",
                settings: { icon: "education", auth: false },
                moduleId: PLATFORM.moduleName("../components/counter/counter"),
                nav: true,
                title: "Counter"
            },
            {
                route: "fetch-data",
                name: "fetchdata",
                settings: { icon: "th-list", auth: false },
                moduleId: PLATFORM.moduleName("../components/fetchdata/fetchdata"),
                nav: true,
                title: "Fetch data"
            },
            {
                route: "login",
                name: "login",
                settings: { icon: "user", auth: false, },
                moduleId: PLATFORM.moduleName("../components/login/login"),
                nav: true,
                title: "Login"
            },
            {
                route: "notFound",
                name: "notFound",
                settings: { auth: false, },
                moduleId: PLATFORM.moduleName("../components/notFound/notFound"),
                nav: false,
                title: "Not Found"
            }
        ]);

        config.mapUnknownRoutes('../components/notFound/notFound');

    }
}
@autoinject
    class PostRenderStep {

        constructor(public eventAggregator: EventAggregator) { }

        run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
            console.log("I'm inside the POST activate step!")
            return Promise.resolve()
                .then(() => this.eventAggregator.publish('messages', new MessagePayload("", "", "")))
                .then(result => next());
        }
    }