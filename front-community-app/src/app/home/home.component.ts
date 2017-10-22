import {Component, NgZone, OnInit} from '@angular/core';
import {VkService} from '../core/service/vk.service';
import {ActivatedRoute} from '@angular/router';
import {SentGiftService} from '../core/service/sent-gift.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  groupId: number;
  userId: number;
  accessToken: string;
  goods = [];
  isSendStep = false;
  friends = [];
  selectedGood = null;
  selectedFriend = null;
  quantity = 1;
  comment = '';
  success = false;

  constructor(private vkService: VkService, private ngZone: NgZone, private activatedRoute: ActivatedRoute, private sentGiftService: SentGiftService) {
    vkService.addCallback('onSettingsChanged', this.loadGoods.bind(this));
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.groupId = params.group_id;
      this.userId = params.user_id;
      this.accessToken = params.access_token;


      this.loadGoods();
      this.loadFriends();
    });
  }

  loadGoods() {
    this.vkService.performCall('market.get', {owner_id: -this.groupId}).subscribe((res) => {
      if (res.response) {
        const items = res.response.slice(1);
        console.log(items);
        this.goods = items;
        this.ngZone.run(() => {
        });
      } else {
        this.vkService.callMethod('showSettingsBox', 134225921).subscribe(() => {

        });
      }
    });
  }

  loadFriends() {
    this.vkService.performCall('friends.get', {fields: 'city'}).subscribe((res) => {
      if (res.response) {
        const items = res.response;
        console.log('friends', items);
        this.friends = items;
        this.ngZone.run(() => {
        });
      }
    });
  }

  selectGood(good) {
    this.isSendStep = true;
    this.selectedGood = good;
  }

  backClick() {
    this.isSendStep = false;
    this.selectedGood = null;
  }

  selectFriend(friend) {
    this.selectedFriend = friend;
  }

  sendGift() {
    this.vkService.performCall('users.get', {}).subscribe((profile) => {
      const myUid = profile.response[0].uid;
      const body = {
        'vk_good_id': this.selectedGood.id,
        'vk_community_id': this.groupId,
        'vk_customer_id': myUid,
        'vk_reciever_id': this.selectedFriend.uid,
        'status': 'new',
        'creation_date': new Date(),
        'comment': this.comment,
        'quantity': this.quantity,
        'image': this.selectedGood.thumb_photo
      };
      this.sentGiftService.sentGiftRequest(body).subscribe(() => {
        this.success = true;
        this.ngZone.run(() => {
        });
      });

    });

  }

}
