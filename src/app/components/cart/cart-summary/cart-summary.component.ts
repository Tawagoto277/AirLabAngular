import { Component, Input } from '@angular/core';
import { CartItem } from '../../../models/shoeData';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {

  @Input() cartItems: CartItem[] = [];

  getTotal() : number{
    return this.cartItems.reduce((total, item) => total + (item.prezzo * item.quantita), 0);
  }
}
