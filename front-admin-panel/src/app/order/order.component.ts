import {Component, OnInit, NgZone} from '@angular/core';
import {VkService} from "../core/service/vk.service";
import {AuthorizationType} from "../core/utils/authorization-type";
import {ApiService} from "../core/service/api.service";
import {URLSearchParams} from "@angular/http";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  isError = true;
  myId: number;
  groupIds = [];
  filter: any;

  availableGroups = [];
  databaseGroups = [];
  currentGid: Number;
  vkOrders = [];

  constructor(private vkService: VkService, private apiService: ApiService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.getGroupOders();
    this.vkService.sendMessage(439080324, "Test", null).subscribe(
      (response) => console.log(response), error2 => console.log(error2)
    );
    // this.vkService.getMyProfile().subscribe(
    //   (response) => console.log(response), error2 => console.log(error2)
    // );
    // this.vkService.getModeratedGroups().subscribe((groups) => {
    //   this.availableGroups = groups;
    //   this.ngZone.run(() => {
    //   });
    // });
  }

  private onGroup(group) {
    // console.log(group);
    if (!group || group.error) {
      this.isError = true;
      group = null;
    } else {
      this.isError = false;
    }
    this.ngZone.run(() => {
    });
  }

  onGroupSelected(gid) {
    console.log(gid);
    this.currentGid = gid;
  }

  getGroupOders() {
    const params = new URLSearchParams();
    this.vkService.getModeratedGroups().subscribe((groups) => {
      this.availableGroups = groups;
      this.databaseGroups = groups.forEach(group => {
          this.filter = {"id": group.gid};
          this.groupIds.push(group.gid);
        }
      );

      this.apiService.filter('orders', AuthorizationType.NONE, params).subscribe(orders => {

        this.vkOrders = orders;
        this.ngZone.run(() => {
        });
      });

    });

    console.log(this.databaseGroups);


    return;
  }
}
