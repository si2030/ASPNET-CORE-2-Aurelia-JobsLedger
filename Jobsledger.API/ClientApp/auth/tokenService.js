var TokenService = /** @class */ (function () {
    function TokenService() {
        this.TOKEN_KEY = "session";
        this.LOGGED_IN = "loggedIn";
        this.USERNAME_KEY = "user_name";
    }
    TokenService.prototype.saveJWT = function (jwt) {
        this.tokenJson = JSON.stringify(jwt);
        try {
            localStorage.setItem(this.TOKEN_KEY, this.tokenJson);
            localStorage.setItem(this.LOGGED_IN, "true");
        }
        catch (Error) {
            return false;
        }
        return true;
    };
    TokenService.prototype.getJWT = function () {
        this.tokenJson = localStorage.getItem(this.TOKEN_KEY);
        if (this.tokenJson) {
            var token = JSON.parse(this.tokenJson);
            return token;
        }
        else {
            return null;
        }
    };
    TokenService.prototype.clearJWT = function () {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.LOGGED_IN);
            localStorage.removeItem(this.USERNAME_KEY);
        }
        catch (Error) {
            return false;
        }
        return true;
    };
    return TokenService;
}());
export { TokenService };
//# sourceMappingURL=tokenService.js.map