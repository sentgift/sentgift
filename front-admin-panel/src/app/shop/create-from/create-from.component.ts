import {Component, NgZone, OnInit} from '@angular/core';
import {VkService} from '../../core/service/vk.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-from',
  templateUrl: './create-from.component.html',
  styleUrls: ['./create-from.component.css']
})
export class CreateFromComponent implements OnInit {

  constructor(private vkService: VkService, private ngZone: NgZone, private route: ActivatedRoute) {
  }

  goods = [];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.vkService.getOrdersByGroupId(params.id).subscribe((goods) => {
          this.goods = goods;
          this.ngZone.run(() => {});
        });
      }
    });
  }

}
