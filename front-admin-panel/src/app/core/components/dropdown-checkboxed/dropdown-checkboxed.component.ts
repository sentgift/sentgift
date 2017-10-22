import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as $ from 'jquery';

declare let jQuery: any;

@Component({
  selector: 'app-dropdown-checkboxed',
  templateUrl: './dropdown-checkboxed.component.html',
  styleUrls: ['./dropdown-checkboxed.component.css']
})
export class DropdownCheckboxedComponent implements OnInit, OnChanges {

  constructor() {
  }

  private _items: Array<any>;

  @Input()
  set items(value: Array<any>) {
    this._items = value;
  }

  get items(): Array<any> {
    return this._items;
  }

  @Input() valueField: string;
  @Input() labelField: string;
  @Input() defaultItem: any;
  @Output() selectedValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();
  private _selectedItem: { label: String, value: any, content: any } = null;
  public selectedValues = [];
  private placeholder = [];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._items = this.getDropdownItems();
  }

  getLabel(): String {
    if (this.items.length > 0) {
      this.placeholder = [];
      for (let selectedValue of this.selectedValues) {
        let itemLabel = selectedValue.content[this.labelField];
        this.placeholder.push(itemLabel);
      }
      if (this.placeholder.length == 0) {
        return 'Выбрать...';
      }
      return this.placeholder.join(', ');
    }

  }

  getDropdownItems(): Array<{ label: String, value: any, content: any }> {
    if (this.items && this.valueField && this.labelField) {
      return this.items.map(item => {
        return this.convertToDropdownItem(item);
      });
    }
    return [];
  }

  checkIfChecked(item) {
    return this.selectedValues.find(value => value == item);
  }

  private convertToDropdownItem(item): { label: String, value: any, content: any } {
    return {label: item[this.labelField], value: item[this.valueField], content: item};
  }

  onValueSelected(item, event) {
    event.stopPropagation();
    let index = this.selectedValues.indexOf(item);
    if(index == -1){
      this.selectedValues.push(item);
      this.selectedValue.emit(this.selectedValues);
    }
    else {
      this.selectedValues.splice(index, 1);
      this.selectedValue.emit(this.selectedValues);
    }
  }
}
