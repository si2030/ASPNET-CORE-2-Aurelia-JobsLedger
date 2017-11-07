export class LoggedInService {
    private LOGGED_IN = "loggedIn";

    public isLoggedIn: boolean = false;
    public userName: string = 'anonymous';

    constructor() { }

    isAuthenticated(): boolean {
        var authenticated = localStorage.getItem(this.LOGGED_IN);

        console.log("LOGGEDIN value HERE!: ", authenticated);

        if (authenticated != null) {
            return true;
        } else {
            return false;
        }
    }
}