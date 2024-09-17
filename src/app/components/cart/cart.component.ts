import { Component, OnInit } from '@angular/core';
import { CartItem, Filtro, Prodotto } from '../../models/shoeData';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  
  constructor(private cs : CartService){}

  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.loadCartItems();
  };

  loadCartItems():void{
    this.cs.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  };

  // Ha senso solo per aumentare i prodotti gia nel carrello
  // addToCart(product: Prodotto): void{
  //   this.cs.updateCartItem(product).subscribe(()=> {
  //     this.loadCartItems();
  //   });
  // };
}
