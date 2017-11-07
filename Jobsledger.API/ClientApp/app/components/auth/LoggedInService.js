var LoggedInService = /** @class */ (function () {
    function LoggedInService() {
        this.LOGGED_IN = "loggedIn";
        this.isLoggedIn = false;
        this.userName = 'anonymous';
    }
    LoggedInService.prototype.isAuthenticated = function () {
        var authenticated = localStorage.getItem(this.LOGGED_IN);
        console.log("LOGGEDIN value HERE!: ", authenticated);
        if (authenticated != null) {
            return true;
        }
        else {
            return false;
        }
    };
    return LoggedInService;
}());
export { LoggedInService };
//# sourceMappingURL=LoggedInService.js.map