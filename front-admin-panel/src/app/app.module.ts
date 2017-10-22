import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CoreModule} from './core/index';
import {ApiService} from './core/service/api.service';
import {CityService} from './core/service/city.service';
import {TokenService} from './core/service/token.service';
import {HttpModule} from '@angular/http';
import {UserService} from './core/service/user.service';
import {AgmCoreModule} from '@agm/core';
import {Ng2CompleterModule} from 'ng2-completer';
import {SlickModule} from 'ngx-slick';
import {SimpleNotificationsModule} from 'angular4-notifications/src/simple-notifications.module';
import {ShopModule} from './shop/shop.module';
import { AppHeaderComponent } from './core/components/app-header/app-header.component';
import { OrderComponent } from './order/order.component';
import {OrderModule} from "./order/order.module";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', loadChildren: './shop/shop.module#ShopModule'},
  {path: 'order', loadChildren: './order/order.module#OrderModule'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    HttpModule,
    ShopModule,
    OrderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFfjJvDfLXbQQ5ItjfJWCy8QIyfpP-3UI',
      language: 'ru'
    }),
    Ng2CompleterModule,
    SimpleNotificationsModule.forRoot(),
  ],

  exports: [
  ],
  providers: [
    ApiService,
    CityService,
    TokenService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
