import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular4-notifications/src/notifications.service';

@Injectable()
export class NotificationService {

  constructor(private simpleNotificationService: NotificationsService) { }

  public showError(header: string, content: string) {
    this.simpleNotificationService.error(header, content);
  }

  public showWarning(header: string, content: string) {
    this.simpleNotificationService.bare(header, content);
  }
}
