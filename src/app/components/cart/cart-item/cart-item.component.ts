import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/shoeData';
import { ShoeDataServiceService } from '../../../services/shoe-data-service.service';
import { CartService } from '../../../services/cart-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  constructor(
    public sds : ShoeDataServiceService, 
    public cs: CartService,
    private http: HttpClient
  ){ }

  @Input() item!: CartItem;

  removeFromCart(product: any, size: number, colore: string) {

    this.http.get<CartItem[]>('http://localhost:3000/cartItems').subscribe(cartItem => {
      const existItem: CartItem | undefined = cartItem.find(item => 
        item.id === product.id && item.colore === colore && item.taglia === size);

      if(existItem){
        this.cs.removeFromCart(product, size, colore).subscribe(() => {
          console.log("eliminato");
        });
      };
    });
  }
}
