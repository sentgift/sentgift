import {Injectable, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

let VK: any;

@Injectable()
export class VkService {


  private data: any = {user: {}};
  appPermissions = 134397343 + 4096;

  constructor() {
    VK = (window as any).VK;
    VK.init({apiId: environment.appId, status: true});
    this.getLoginStatus().subscribe((response) => {
      if (!response.session) {
        this.login(() => {
        });
      }
    });
  }

  login(callback) {
    function authInfo(response) {
      if (response.session) {
        this.data.user = response.session.user;
        callback(this.data.user);
      } else {
        alert('Авторизоваться не удалось!');
      }
    }

    VK.Auth.login(authInfo.bind(this), this.appPermissions);

  }

  performCall(method: String, params: any): Observable<any> {
    return Observable.create(subscriber => {
      VK.api(method, params, (response) => {
        subscriber.next(response);
      });
    });
  }

  getMyId() {
    if (VK && VK._Session) {
      return VK._session.mid;
    }
    return null;
  }

  getLoginStatus(): Observable<any> {
    return Observable.create(subscriber => {
      VK.Auth.getLoginStatus((response) => {
        subscriber.next(response);
      });
    });
  }

  getModeratedGroups(): Observable<any> {
    return this.performCall('groups.get', {
      filter: 'moder',
      count: 1000,
      extended: 1,
      fields: 'description'
    }).map(response => response.response.slice(1));
  }

  getMyProfile(): Observable<any> {
    return this.performCall('users.get', {fields: 'photo_50'}).map((response => response.response[0]));
  }

  getProfile(id: string): Observable<any> {
    return this.performCall('users.get', {"user_ids": id}).map((response => {
      return  response.response;
    }));
  }

  getOrders(gid: Number): Observable<any> {
    return this.performCall('market.search', {
      owner_id: -gid,
      extended: 1
    }).map(response => response.response && response.response instanceof Array ? response.response.slice(1) : response);
  }

  getOrdersByGroupId(gid: Number): Observable<any> {
    return this.performCall('market.get', {
      owner_id: -gid,
      extended: 1
    }).map(response => response.response && response.response instanceof Array ? response.response.slice(1) : response);
  }

  getOrderById(gid: Number): Observable<any> {
    return this.performCall('market.getById', {
      owner_id: -gid,
      extended: 1
    }).map(response => response.response && response.response instanceof Array ? response.response.slice(1) : response);
  }

  isInitialized() {
    return VK._session && VK._session.mid;
  }

  sendMessage(user: Number, message: String, image: String): Observable<any> {
    return this.performCall('messages.send', {
      user_id: user,
      message: message
    }).map(response => response.response && response.response instanceof Array ? response.response.slice(1) : response);
  }
}
