import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SelectItem} from 'ng2-select';
import {isString} from 'util';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit, OnChanges {
  constructor() {
  }

  @Input() items: Array<any>;
  @Input() valueField: string;
  @Input() labelField: string;
  @Input() selectedValue: any;
  @Input() isEmptyByDefault = false;
  private _selectedItem: any;
  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter();

  @Output() colorOutput: EventEmitter<any> = new EventEmitter<any>();
  private _values = {};

  ngOnInit() {
  }



  get selectedItem(): any {
    return this._selectedItem;
  }

  @Input()
  set selectedItem(value: any) {
    if (value === this._selectedItem) {
      return;
    }
    if (value) {
      this._selectedItem = value;
      this.selectedItemChange.emit(value);
      this.selectedValueChange.emit(this._values[value.id]);
    } else {
      this._selectedItem = null;
      this.selectedItemChange.emit(null);
      this.selectedValueChange.emit(null);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items && this.items.length > 0) {
      this.mapDropdownItems();
      if (!this.selectedValue) {
        if (!this.isEmptyByDefault) {
          this.selectedItem = this.mapDropdownItems()[0];
        }
      } else {
        this._setSelectedValueFromInput();
      }
    }
  }

  private _setSelectedValueFromInput() {
    let currentItem = this.selectedValue;
    if (Number(this.selectedValue) || isString(this.selectedValue)) {
      if (this._values.hasOwnProperty(this.selectedValue)) {
        currentItem = this._values[this.selectedValue];
      }
    }
    const newSelectItem = this.convertToDropdownItem(currentItem);
    if (newSelectItem.id) {
      this.selectedItem = this.convertToDropdownItem(currentItem);
    }
  }

  mapDropdownItems(): Array<SelectItem> {
    if (this.items && this.valueField && this.labelField) {
      this._values = {};
      return this.items.map(item => {
        const selectItem = this.convertToDropdownItem(item);
        this._values[selectItem.id] = item;
        return selectItem;
      });
    }
    return [];
  }

  private convertToDropdownItem(item): SelectItem {
    return new SelectItem({
        text: item[this.labelField] ? item[this.labelField] : null,
        id: item[this.valueField] ? item[this.valueField] : null
      }
    );
  }
}
