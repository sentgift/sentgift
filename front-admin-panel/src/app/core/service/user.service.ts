import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {AuthorizationType} from '../utils/authorization-type';
import {OAuthTokenResponse} from '../models/oauth.token';
import {TokenService} from './token.service';
import {CurrentUserInfo} from '../models/current.user.info.model';

@Injectable()
export class UserService {

  constructor(private apiService: ApiService, private tokenService: TokenService) {
  }

  checkLoginExist(login: String): Observable<boolean> {
    return this.apiService.get('user/check/email/' + login, AuthorizationType.NONE);
  }

  authorize(login: string, password: string): Observable<OAuthTokenResponse> {
    const params = new URLSearchParams();
    params.set('scope', 'write');
    params.set('grant_type', 'password');
    params.set('username', login);
    params.set('password', password);
    return this.apiService.post('oauth/token', AuthorizationType.BASIC, params.toString());
  }

  isUserAuthorized(): boolean {
    return !!this.tokenService.getToken() && !!this.getCurrentUserInfo();
  }

  setAuthorization(authData: OAuthTokenResponse): void {
    this.tokenService.saveToken(authData.access_token);
    this.tokenService.saveRefreshToken(authData.refresh_token);
  }

  loadCurrentUserInfo(): Observable<CurrentUserInfo> {
    return this.apiService.get('user/current', AuthorizationType.BEARER);
  }

  logout() {
    this.tokenService.destroyToken();
    this.setCurrentUserInfo(undefined);
  }

  setCurrentUserInfo(info: CurrentUserInfo) {
    window.localStorage['currentUserInfo'] = JSON.stringify(info);
  }

  getCurrentUserInfo(): CurrentUserInfo {
    return JSON.parse(window.localStorage['currentUserInfo']);
  }

  sendSignupMessage(login: String, loginType: String, spamConfirmed: Boolean): Observable<any> {
    return this.apiService.post('signup', AuthorizationType.NONE, {
      login, loginType, spamConfirmed,
    });
  }

  sendForgotPasswordMessage(login: String): Observable<any> {
    return this.apiService.post('signup/forgotpassword/' + login, AuthorizationType.NONE);
  }

  changePassword(newPassword: String, token: String): Observable<any> {
    return this.apiService.patch('user/' + token + '/password?newPassword=' + newPassword, AuthorizationType.NONE);
  }

  confirmRegistration(login: String, loginType: String, accessToken: String) {
    return this.apiService.post('signup/confirm', AuthorizationType.NONE, {
      accessToken: accessToken,
      login: login,
      loginType: loginType,
    });
  }
}
