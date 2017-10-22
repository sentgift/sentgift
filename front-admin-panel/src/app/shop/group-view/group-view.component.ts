import {Component, Input, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {VkService} from '../../core/service/vk.service';
import {SentGiftService} from '../../core/service/sent-gift.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit, OnChanges {

  @Input() groupId: any;
  goods: any;
  isError = true;
  myId: number;

  constructor(private vkService: VkService, private ngZone: NgZone, private sentGiftService: SentGiftService) {
  }

  ngOnInit() {
    this.myId = this.vkService.getMyId();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.groupId) {
      this.vkService.getOrdersByGroupId(this.groupId).subscribe(this.onGroupRecieved.bind(this));
    } else {
      this.goods = null;
    }
  }

  addGood(good) {
    this.sentGiftService.addGood(good).subscribe((res) => {
      console.log(res);
    });
  }

  private onGroupRecieved(group) {
    console.log(group);
    if (!group || group.error) {
      this.isError = true;
      group = null;
    } else {
      this.goods = group;
      this.isError = false;
    }
    this.ngZone.run(() => {
    });
  }


}
