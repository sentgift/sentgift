export class OAuthTokenResponse {
  private _access_token: String;
  private _expires_in: Number;
  private _refresh_token: String;

  get access_token(): String {
    return this._access_token;
  }

  set access_token(value: String) {
    this._access_token = value;
  }

  get expires_in(): Number {
    return this._expires_in;
  }

  set expires_in(value: Number) {
    this._expires_in = value;
  }

  get refresh_token(): String {
    return this._refresh_token;
  }

  set refresh_token(value: String) {
    this._refresh_token = value;
  }
}
