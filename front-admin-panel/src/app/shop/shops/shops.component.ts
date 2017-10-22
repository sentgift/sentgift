import {Component, NgZone, OnInit} from '@angular/core';
import {VkService} from '../../core/service/vk.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  availableGroups = [];
  currentGid: Number;

  constructor(private vkService: VkService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.vkService.getModeratedGroups().subscribe((groups) => {
      this.availableGroups = groups;
      console.log(groups);
      this.ngZone.run(() => {
      });
    });
  }

  onGroupSelected(gid) {
    console.log(gid);
    this.currentGid = gid;
  }

}
