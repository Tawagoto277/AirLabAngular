import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path : 'shop', component: SidebarComponent},
  {path : '', component: HomepageComponent},
  {path : '**', component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
