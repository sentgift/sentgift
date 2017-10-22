import {NgModule} from '@angular/core';
import {ApiService} from './service/api.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {VkService} from './service/vk.service';
import {SentGiftService} from './service/sent-gift.service';
import {SelectModule} from 'ng2-select';
import {DropdownComponent} from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    DropdownComponent,
  ],
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule,
    SelectModule
  ],
  exports: [
    DropdownComponent,
  ],
  providers: [
    ApiService,
    VkService,
    SentGiftService,
  ],
})
export class CoreModule {
}
