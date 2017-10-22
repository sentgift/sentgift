import {Component, NgZone, OnInit} from '@angular/core';
import {VkService} from '../../service/vk.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  currentUser: any = null;

  constructor(private vkService: VkService, private ngZone: NgZone) {

  }

  ngOnInit() {
    this.vkService.getMyProfile().subscribe((response) => {
      this.currentUser = response;
    });
  }
}
