import { Aurelia, PLATFORM, autoinject } from "aurelia-framework";
import {
    Redirect,
    NavigationInstruction,
    Router,
    RouterConfiguration,
    Next,
    PipelineProvider
} from "aurelia-router";
import { HttpClient, json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';

import { MessagePayload } from '../../services/messages/messages'
import { App } from '../../app/app/app'

@autoinject
export class AuthService {

    private session = false
    private sessionJson: any;
    private usernameJson: any;
    private TOKEN_KEY = "session";


    constructor(
        private userLogin: UserLogin,
        private http: HttpClient,
        private router: Router,
        private aurelia: Aurelia,
        private pipelineProvider: PipelineProvider,
        private eventAggregator: EventAggregator) { }


    checkJWTStatus(): string {
        const session = localStorage.getItem(this.TOKEN_KEY);
        if (!session) {
            return "noSession";
        }
        if (this.hasTokenExpired()) {

            return "expiredSession";
        }
        return "sessionOK";
    }

    login(username: string, password: string) {
        this.userLogin.Username = username;
        this.userLogin.Password = password;

        // Lets do a fetch!
        const task = fetch("/api/jwt", {
            method: "POST",
            body: JSON.stringify(this.userLogin),
            headers: new Headers({ 'content-type': 'application/json' })
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(this.TOKEN_KEY, JSON.stringify(data));
            })
            .then(() => {
                const origin = localStorage.getItem('origin'); // Save origin BEFORE we reset so we can navigate to it later.
                return Promise.resolve()
                    .then(() => this.pipelineProvider.reset())
                    .then(() => this.router.navigate("/", { replace: true, trigger: false }))
                    .then(() => this.router.reset())
                    .then(() => this.aurelia.setRoot(PLATFORM.moduleName('app/app/app'))
                        .then(() => {
                            if (origin) { // Only logout removes current origin so we can now navigate to origin if expired.
                                localStorage.removeItem('origin');
                                this.router.navigate(origin);
                            }
                        }))
                    .then(() => this.eventAggregator.publish('messages', new MessagePayload("You have been logged  back in", "", "success")))
            })
            .catch(error => {
                console.log('catch error', error)
                this.clearIdentity();
            });
    };

    splitToken() {
        this.sessionJson = localStorage.getItem(this.TOKEN_KEY);
        if (this.sessionJson) {
            var base64Url = JSON.parse(this.sessionJson).access_token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var token = JSON.parse(window.atob(base64));
            return token;
        } else {
            return null;
        }
    }

    hasIdentity(): boolean {
        this.sessionJson = localStorage.getItem(this.TOKEN_KEY);

        if (this.sessionJson) {
            return true;
        } else {
            return false
        }
    };

    clearIdentity(): boolean {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
        } catch (Error) {
            return false;
        }
        return true;
    }

    getUserRole() {
        var token = this.splitToken()
        for (var key in token) {
            if (key.includes('role')) {
                return token[key];
            }
        }
    }

    getUserName() {
        var token = this.splitToken()
        for (var key in token) {
            if (key.includes('name')) {
                return token[key];
            }
        }
    }

    hasTokenExpired(): boolean {
        if ((this.splitToken().exp - Math.floor(Date.now() / 1000)) < 0) {
            return true;
        } else {
            return false;
        }
    }

    forceReturnToPublic(): Promise<any> {
        console.log("forceReturnToPublic()")
        return Promise.resolve()
            .then(() => this.pipelineProvider.reset())
            .then(() => this.clearIdentity())
            .then(() => this.router.navigate("/", { replace: true, trigger: false }))
            .then(() => this.router.reset())
            .then(() => this.aurelia.setRoot(PLATFORM.moduleName('public/public/public'))
                .then(() => {
                    const origin = localStorage.getItem('origin');
                    if (origin) {
                        this.router.navigate('login')
                        this.eventAggregator.publish('messages', new MessagePayload("Your session has expired.", "Login again to return back to your page.", "warning"));
                    } else {
                        this.eventAggregator.publish('messages', new MessagePayload("You have been logged out.", "", "success"));
                    }
                }));
    }
}

interface UserLogin {
    Username: string;
    Password: string;
}

    //private LOGGED_IN = "loggedIn";
    //private USERNAME_KEY = "user_name";
    //private USERROLES_KEY = "user_role"


//isAuthenticated(): boolean {
    //    this.session = this.hasIdentity();
    //    console.log("SESSION - ISAUTHENTICATED: ", this.session);

    //    if (this.session) {
    //        return true;
    //    } else {
    //        return false;
    //    }
    //}

    // We use this in the boot.ts file to determine if we have a session object.

//    // Goes to localstorage and if the username is there returns it.
//    getUserName(): string {
//        var username = localStorage.getItem(this.USERNAME_KEY);
//        console.log("Username from local storage: ", username);

//        if (username) {
//            return username;
//        } else {
//            return 'anonymous';
//        };
//    }

//    // Goes to localstorage and if roles exist returns them.
//    getUserRole(): any {
//        var userRole = localStorage.getItem(this.USERROLES_KEY);
//        if (userRole) {
//            return userRole;
//        } else {
//            return null;
//        }
//    }
//}

////  Get both the user name and their roles as 'detail' and save it to local storage.
//saveUserDetail(): any {
//    const session = this.getIdentity();
//    if (!session) {
//        throw new Error("No JWT present");
//    }
//    const token = session.access_token;

//    const headers = new Headers({
//        Authorization: `bearer ${token}`,
//        "Content-Type": "application/json; charset=utf-8"
//    });

//    const task = fetch("/api/jwt/userDetail", {
//        method: "GET",
//        headers
//    })
//        .then(response => response.json())
//        .then(data => {
//            try {
//                console.log("data.stringify: ", JSON.stringify(data));
//                localStorage.setItem(this.USERNAME_KEY, data.username);
//                localStorage.setItem(this.USERROLES_KEY, data.role);
//            } catch (Error) { }

//            console.log("localStorage.getItem(this.USERNAME_KEY): ", localStorage.getItem(this.USERNAME_KEY));
//        });
//    return task;
//}

    //getIdentity(): any {
    //    this.sessionJson = localStorage.getItem(this.TOKEN_KEY);
    //    if (this.sessionJson) {
    //        const token = JSON.parse(this.sessionJson);
    //        return token;
    //    } else {
    //        return null;
    //    }
    //};



