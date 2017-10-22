import {OrderComponent} from "./order.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {OrderRoutingModule} from "./order-routing.module";
@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
  ],
  declarations: [OrderComponent]
})
export class OrderModule { }
