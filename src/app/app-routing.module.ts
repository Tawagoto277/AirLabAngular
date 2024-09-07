import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {path : 'shop', component: ShopComponent},
  {path : 'shop/:id', component: ShopComponent},
  {path : '', component: HomepageComponent},
  {path : '**', component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
