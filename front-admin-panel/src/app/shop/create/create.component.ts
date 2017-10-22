import {Component, NgZone, OnInit} from '@angular/core';
import {VkService} from '../../core/service/vk.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  availableGroups = [];

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

}
