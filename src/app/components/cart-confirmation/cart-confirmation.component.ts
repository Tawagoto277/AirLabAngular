import { Component, Input, OnInit } from '@angular/core';
import { Prodotto } from '../../models/shoeData';

@Component({
  selector: 'app-cart-confirmation',
  templateUrl: './cart-confirmation.component.html',
  styleUrl: './cart-confirmation.component.scss'
})
export class CartConfirmationComponent{
  
  @Input()
  product!: Prodotto;
  isVisible: boolean = false;

  showConfirmatin(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  };
}
