import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from "@angular/common/http"
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CardComponent } from './components/homepage/card/card.component';
import { SliderComponent } from './components/homepage/slider/slider.component';
import { ShopComponent } from './components/shop/shop.component';
import { CardPComponent } from './components/shop/card-p/card-p.component';
import { StarRatingPipe } from './pipe/star-rating.pipe';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    CardComponent,
    SliderComponent,
    ShopComponent,
    CardPComponent,
    StarRatingPipe,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
