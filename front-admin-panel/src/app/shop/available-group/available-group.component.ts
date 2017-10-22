import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-available-group',
  templateUrl: './available-group.component.html',
  styleUrls: ['./available-group.component.css']
})
export class AvailableGroupComponent implements OnInit {

  @Input() group: any;

  constructor() {
  }

  ngOnInit() {
  }

}
