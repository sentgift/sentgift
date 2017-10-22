import {Component, OnInit, NgZone} from '@angular/core';
import {VkService} from "../core/service/vk.service";
import {SentGiftService} from "../core/service/sent-gift.service";

@Component({
  selector: 'app-single-good-view',
  templateUrl: './single-good-view.component.html',
  styleUrls: ['./single-good-view.component.css']
})
export class SingleGoodViewComponent implements OnInit {

  constructor(private vkService: VkService, private ngZone: NgZone, private sentGiftService: SentGiftService) {
  }

  ngOnInit() {

    // this.vkService.getModeratedGroups().subscribe((groups) => {
    //   this.availableGroups = groups;
    //   console.log(groups);
    //   this.ngZone.run(() => {
    //   });
    // });

  }

}
