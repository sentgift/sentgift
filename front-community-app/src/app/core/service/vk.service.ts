import {Injectable, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

let VK: any;

@Injectable()
export class VkService {


  private data: any = {user: {}};
  appPermissions = 134397343;

  constructor() {
    VK = (window as any).VK;
    VK.init(() => {
      console.log('VK API is initialized successfully!');
    });

  }

  performCall(method: String, params: any): Observable<any> {
    return Observable.create(subscriber => {
      VK.api(method, params, (response) => {
        console.log(VK);
        subscriber.next(response);
      });
    });
  }

  callMethod(method: String, params: any): Observable<any> {
    return Observable.create(subscriber => {
      VK.callMethod(method, params, (response) => {
        subscriber.next(response);
      });
    });
  }

  addCallback(eventName: String, cb: Function) {
    VK.addCallback(eventName, cb);
  }

  isInitialized() {
    return VK._session && VK._session.mid;
  }
}
