import {NgModule} from '@angular/core';
import {ApiService} from './service/api.service';
import {CityService} from './service/city.service';
import {TokenService} from './service/token.service';
import {UserService} from './service/user.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import {CommonModule} from '@angular/common';
import {GeocodingService} from './service/geocoding.service';
import {RouterModule} from '@angular/router';
import {CountryService} from './service/country.service';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {DropdownCheckboxedComponent} from './components/dropdown-checkboxed/dropdown-checkboxed.component';
import {SlickModule} from 'ngx-slick';
import {SelectModule} from 'ng2-select';
import {ToArrayPipe} from './utils/to-array.pipe';
import {NotificationService} from './service/notification.service';
import {SimpleNotificationsModule} from 'angular4-notifications/src/simple-notifications.module';
import {DistancePipe} from './utils/distance.pipe';
import {TextMaskModule} from 'angular2-text-mask';
import {VkService} from './service/vk.service';
import {SentGiftService} from './service/sent-gift.service';

@NgModule({
  declarations: [
    DropdownCheckboxedComponent,
    ToArrayPipe,
    DistancePipe,
  ],
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    FileUploadModule,
    RouterModule,
    NgxMyDatePickerModule.forRoot(),
    SelectModule,
    SimpleNotificationsModule.forRoot(),
    TextMaskModule,
  ],
  exports: [
    DropdownCheckboxedComponent,
    ToArrayPipe,
    DistancePipe,
  ],
  providers: [
    ApiService,
    CityService,
    TokenService,
    UserService,
    GeocodingService,
    CountryService,
    NotificationService,
    VkService,
    SentGiftService,
  ],
})
export class CoreModule {
}
