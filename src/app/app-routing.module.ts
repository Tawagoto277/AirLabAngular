import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path : 'shop', component: ShopComponent},
  {path : 'shop/category/:category', component: ShopComponent},
  {path : 'shop/product/:id', component: ProductComponent},
  {path : 'cart', component: CartComponent},
  {path : 'payment', component: PaymentComponent},
  {path : '', component: HomepageComponent},
  {path : '**', component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
