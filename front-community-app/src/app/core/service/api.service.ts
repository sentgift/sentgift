import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {unescape} from 'querystring';

@Injectable()
export class ApiService {
  constructor(private http: Http,
              private router: Router) {

  }

  private getHeaders(isFormData: Boolean = false): Headers {
    const headersConfig = {
      'Content-Type': isFormData ? undefined : 'application/json',
      'Accept': 'application/json',
    };
    return new Headers(headersConfig);
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.base_url}api/${path}`, {
      headers: this.getHeaders(),
      search: unescape(params.toString()),
    });
  }


  filter(path: string, params: any): Observable<any> {
    return this.http.get(`${environment.base_url}api/${path}`, {
      headers: this.getHeaders(),
      search: JSON.stringify(params),
    });
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.base_url}api/${path}`,
      body,
      {headers: this.getHeaders()},
    );
  }

  put(path: string, body: Object = {},
      params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.put(
      `${environment.base_url}${path}?` + params.toString(),
      {headers: this.getHeaders(), params: params},
    );
  }

  patch(path: string, body: Object = {},
        params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.patch(
      `${environment.base_url}${path}`,
      {headers: this.getHeaders(), search: params},
    );
  }
}
