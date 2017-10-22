import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {TokenService} from './token.service';
import {AuthorizationType} from '../utils/authorization-type';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';
import {unescape} from 'querystring';

@Injectable()
export class   ApiService {
  constructor(private http: Http,
              private tokenService: TokenService,
              private router: Router,
              private notificationService: NotificationService) {

  }

  private getHeaders(authorizationType: AuthorizationType, isFormData: Boolean = false): Headers {
    const headersConfig = {
      'Content-Type': isFormData ? undefined : 'application/json',
      'Accept': 'application/json',
    };

    if (authorizationType === AuthorizationType.BASIC) {
      headersConfig['Authorization'] = `Basic ${environment.oauth_basic_token}`;
      headersConfig['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    }

    if (authorizationType === AuthorizationType.BEARER) {
      headersConfig['Authorization'] = `Bearer ${this.tokenService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private catchError(error: any) {
    if (error.status === 401) {
      this.tokenService.destroyToken();
      this.router.navigate(['login']);
    } else if (error.status === 406) {
    } else if (error.status !== 400) {
    } else if (error.status !== 400 && error.startTime !== 404) {
      this.notificationService.showError('Ошибка сервера',
        'Пожалуйста, обратитесь к администратору с описанием проблемы. Код ошибки: ' + error.status);
    }
    return Observable.throw(error);
  }

  get(path: string, authorizationType: AuthorizationType, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.base_url}api/${path}`, {
      headers: this.getHeaders(authorizationType),
      search: unescape(params.toString()),
    })
      .catch(this.catchError.bind(this))
      .map((res: Response) => res.json());
  }


  filter(path: string, authorizationType: AuthorizationType, params: any): Observable<any> {
    return this.http.get(`${environment.base_url}api/${path}`, {
      headers: this.getHeaders(authorizationType),
      search: JSON.stringify(params),
    })
      .catch(this.catchError.bind(this))
      .map((res: Response) => res.json());
  }

  post(path: string, authorizationType: AuthorizationType, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.base_url}api/${path}`,
      authorizationType !== AuthorizationType.BASIC ? JSON.stringify(body) : body,
      {headers: this.getHeaders(authorizationType)},
    )
      .catch(this.catchError.bind(this))
      .map((res: Response) => res.json());
  }

  put(path: string, authorizationType: AuthorizationType, body: Object = {},
      params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.put(
      `${environment.base_url}${path}?` + params.toString(),
      authorizationType !== AuthorizationType.BASIC ? JSON.stringify(body) : body,
      {headers: this.getHeaders(authorizationType), params: params},
    )
      .catch(this.catchError.bind(this))
      .map((res: Response) => res.json());
  }

  patch(path: string, authorizationType: AuthorizationType, body: Object = {}, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.patch(
      `${environment.base_url}${path}`, body,
      {headers: this.getHeaders(authorizationType), search: params},
    )
      .catch(this.catchError.bind(this))
      .map((res: Response) => res.json());
  }
}
