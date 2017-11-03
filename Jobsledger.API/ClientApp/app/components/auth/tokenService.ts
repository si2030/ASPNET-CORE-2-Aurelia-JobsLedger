export class TokenService {
  private tokenJson: any;
  private TOKEN_KEY = "jwt";
  constructor() {}

  saveJWT(jwt: any): boolean {
    this.tokenJson = JSON.stringify(jwt);

    try {
      localStorage.setItem(this.TOKEN_KEY, this.tokenJson);
    } catch (Error) {
      return false;
    }
    return true;
  }

  getJWT(): any {
    this.tokenJson = localStorage.getItem(this.TOKEN_KEY);
    if (this.tokenJson) {
      const token = JSON.parse(this.tokenJson);
      return token;
    } else {
      return null;
    }
  }

  clearJWT(): boolean {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (Error) {
      return false;
    }
    return true;
  }
}
