export class IsLoggedIn {
    private LOGGED_IN = "loggedIn";
    constructor() { }

    isAuthenticated(): boolean {


        var authenticated = localStorage.getItem(this.LOGGED_IN);

        console.log('LOGGEDIN - typeof: ', authenticated);

        if (authenticated != null) {
            return true;
        } else
            return false;
    }
}
   