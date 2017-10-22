import {Component, OnInit} from '@angular/core';
import {SentGiftService} from '../../core/service/sent-gift.service';
import {VkService} from '../../core/service/vk.service';

@Component({
  selector: 'app-available-goods',
  templateUrl: './available-goods.component.html',
  styleUrls: ['./available-goods.component.css']
})
export class AvailableGoodsComponent implements OnInit {

  constructor(private sentGiftService: SentGiftService, private vkService: VkService) {
  }

  ngOnInit() {

    const interval = setInterval(() => {
      if (this.vkService.isInitialized()) {
        this.sentGiftService.getMyGoods().subscribe((res) => {
          console.log(res);
        });
        clearInterval(interval);
      }
    }, 100);
  }

}
