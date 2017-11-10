import { Aurelia } from 'aurelia-framework';
import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';

import { App } from '../app/app/app'

@autoinject
export class AuthService {

    private session = null
    private sessionJson: any;
    private usernameJson: any;
    private TOKEN_KEY = "session";
    private LOGGED_IN = "loggedIn";
    private USERNAME_KEY = "user_name";
    private USERROLES_KEY = "user_roles"

    constructor(private userLogin: UserLogin,
                private aurelia: Aurelia,
                private http: HttpClient,
                private router: Router) {

        this.session = this.hasIdentity();
    }

    // We use this in the boot.ts file to determine if we have a session object.
    isAuthenticated() {
        return this.session !== null;
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
                localStorage.setItem(this.LOGGED_IN, JSON.stringify("authenticated"))
                this.saveUserDetail();
            })
            .catch(error => {
                this.clearIdentity();
            });

        this.router.navigate('/', { replace: true, trigger: false });
        this.router.reset();
        this.aurelia.setRoot('app/app/app');
    };

    logout() {
        this.router.navigate('/', { replace: true, trigger: false });

        this.aurelia.setRoot('public/public/public');

    };

    hasIdentity(): any {
        this.sessionJson = localStorage.getItem(this.TOKEN_KEY);

        return JSON.parse(this.sessionJson || null);
    };

    getIdentity(): any {
        this.sessionJson = localStorage.getItem(this.TOKEN_KEY);
        if (this.sessionJson) {
            const token = JSON.parse(this.sessionJson);
            return token;
        } else {
            return null;
        }
    };


    clearIdentity(): boolean {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.LOGGED_IN);
            localStorage.removeItem(this.USERNAME_KEY);
            localStorage.removeItem(this.USERROLES_KEY)
        } catch (Error) {
            return false;
        }
        return true;
    }

    //  Get both the user name and their roles as 'detail' and save it to local storage.
    saveUserDetail() {
        const session = this.getIdentity();
        if (!session) {
            throw new Error("No JWT present");
        }
        const token = session.access_token;

        const headers = new Headers({
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        });

        const task = fetch("/api/jwt/userDetail", {
            method: "GET",
            headers
        })
            .then(response => response.json())
            .then(data => {
                try {
                    console.log("data.stringify: ", JSON.stringify(data));
                    localStorage.setItem(this.USERNAME_KEY, data.username);
                    localStorage.setItem(this.USERROLES_KEY, JSON.stringify(data.roles));
                } catch (Error) { }
            });
    }

    saveJWT(jwt: any): boolean {

        var tokenJson: any;

        tokenJson = JSON.stringify(jwt);

        try {
            localStorage.setItem(this.TOKEN_KEY, tokenJson);
            localStorage.setItem(this.LOGGED_IN, "true");
        } catch (Error) {
            return false;
        }
        return true;
    }

    // Goes to localstorage and if the username is there returns it.
    getUserName(): string {
        var usernameJson = localStorage.getItem(this.USERNAME_KEY);
        if (this.usernameJson) {
            const userName = JSON.parse(this.usernameJson);
            return userName;
        } else {
            return 'anonymous';
        }
    }

    // Goes to localstorage and if roles exist returns them. TODO.
}



interface UserLogin {
    Username: string;
    Password: string;
}