import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {CreateFromComponent} from './create-from/create-from.component';
import {ShopsComponent} from './shops/shops.component';


const shopRoutes: Routes = [
  {
    path: 'shop', component: ShopsComponent,  children: [
    {path: '', component: ListComponent},
  ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(shopRoutes),
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
