import {Injectable} from '@angular/core';
const TOKEN_STORAGE_NAME = 'oauth2Token';
const REFRESH_TOKEN_STORAGE_NAME = 'refreshToken';

@Injectable()
export class TokenService {
  getToken(): String {
    return window.localStorage[TOKEN_STORAGE_NAME];
  }

  saveToken(token: String) {
    window.localStorage[TOKEN_STORAGE_NAME] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(TOKEN_STORAGE_NAME);
    window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_NAME);
  }

  clearLocalStorage() {
    window.localStorage.clear();
  }

  getRefreshToken(): String {
    return window.localStorage[REFRESH_TOKEN_STORAGE_NAME];
  }

  saveRefreshToken(token: String) {
    window.localStorage[REFRESH_TOKEN_STORAGE_NAME] = token;
  }


}
