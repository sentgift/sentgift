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
  userIds: string;
  currentGid: Number;
  vkOrders = [];
  userFullName: string;
  users = [];

  constructor(private vkService: VkService, private apiService: ApiService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.getGroupOders();
    this.vkService.sendMessage(439080324, "Test", null).subscribe(
      (response) => console.log(response), error2 => console.log(error2)
    );

    this.ngZone.run(() => {
    });
  }

  getUserInfo(user_id: string) {

    const result = this.users.filter((user)=>user.uid==user_id)[0];
    if (result) {
      return result.first_name+' '+result.last_name;
    }
    return '';
  }

  onGroupSelected(gid) {
    console.log(gid);
    this.currentGid = gid;
  }


  getGroupOders() {
    const params = new URLSearchParams();


    this.apiService.filter('orders', AuthorizationType.NONE, params).subscribe(orders => {
      // this.userIds = '';
      orders.forEach(order => {
        if (order.vk_reciever_id && order.vk_customer_id) {
          this.userIds += order.vk_reciever_id + ',' + order.vk_customer_id + ',';
        }
        // this.userIds.push(order.vk_reciever_id);
        // this.userIds.push(order.vk_customer_id);
        this.vkOrders = orders;
      });
      this.vkService.getProfile(this.userIds).subscribe(profiles => {
        this.users = profiles;
        this.ngZone.run(() => {
        });
      });

      this.ngZone.run(() => {
      });
    });
  }

  acceptOrder(order) {
    this.apiService.patch(`api/orders/${order.id}`, AuthorizationType.NONE, {"status": "confirmed"  }).subscribe((response) => {
      order.status = "Подтверждён";
      this.ngZone.run(() => {
      });
    });
  }

  declineOrder(order) {
    this.apiService.patch(`api/orders/${order.id}`, AuthorizationType.NONE, {"status": "confirmed"  }).subscribe((response) => {
      order.status = "Отменён";
      this.ngZone.run(() => {
      });
    });
  }
}
