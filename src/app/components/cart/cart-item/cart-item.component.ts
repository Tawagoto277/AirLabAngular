import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/shoeData';
import { ShoeDataServiceService } from '../../../services/shoe-data-service.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  constructor(public sds : ShoeDataServiceService){ }

  @Input() item!: CartItem;
  @Output() remove = new EventEmitter<string>();
  @Output() add = new EventEmitter<CartItem>();

  removeFromCart(itemId: string) {
    this.remove.emit(itemId);
  }

  addToCart(item: CartItem) {
    this.add.emit(item);
  }
}
