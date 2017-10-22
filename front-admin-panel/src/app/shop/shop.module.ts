import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {ShopRoutingModule} from './shop-routing.module';
import { CreateFromComponent } from './create-from/create-from.component';
import { ShopsComponent } from './shops/shops.component';
import { AvailableGoodComponent } from './available-good/available-good.component';
import { AvailableGoodsComponent } from './available-goods/available-goods.component';
import { AvailableGroupsComponent } from './available-groups/available-groups.component';
import { AvailableGroupComponent } from './available-group/available-group.component';
import { GroupViewComponent } from './group-view/group-view.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
  ],
  declarations: [CreateComponent, ListComponent, CreateFromComponent, ShopsComponent, AvailableGoodComponent, AvailableGoodsComponent, AvailableGroupsComponent, AvailableGroupComponent, GroupViewComponent]
})
export class ShopModule { }
