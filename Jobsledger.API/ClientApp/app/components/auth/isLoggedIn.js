var IsLoggedIn = /** @class */ (function () {
    function IsLoggedIn() {
        this.LOGGED_IN = "loggedIn";
    }
    IsLoggedIn.prototype.isAuthenticated = function () {
        var authenticated = localStorage.getItem(this.LOGGED_IN);
        console.log('LOGGEDIN - typeof: ', authenticated);
        if (authenticated != null) {
            return true;
        }
        else
            return false;
    };
    return IsLoggedIn;
}());
export { IsLoggedIn };
//# sourceMappingURL=isLoggedIn.js.map