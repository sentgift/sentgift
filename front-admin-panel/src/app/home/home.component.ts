import {Component, NgZone, OnInit} from '@angular/core';
import {VkService} from '../core/service/vk.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private vkService: VkService, private ngZone: NgZone) { }
  currentUserInfo: any = {photo_50: '', first_name: '', last_name: ''};
  myGroups: Array<any> = [];
  ngOnInit() {
    this.vkService.performCall('users.get', {}).subscribe((response) => {
      this.currentUserInfo = response.response[0];
      this.ngZone.run(() => {});
    });

    this.vkService.performCall('groups.get', {}).subscribe((response) => {
      this.currentUserInfo = response.response[0];
      this.ngZone.run(() => {});
    });

    this.vkService.getModeratedGroups().subscribe((response) => {
      this.myGroups = response.response;
      console.log(this.myGroups);
      this.ngZone.run(() => {});
    });
  }

}
