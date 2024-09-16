import { Component, OnInit } from '@angular/core';
import { Filtro, Prodotto } from '../../models/shoeData';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  
  constructor(private cs : CartService){}

  cartItems: Prodotto[] = [];

  ngOnInit(): void {
    this.loadCartItems();
  };

  loadCartItems():void{
    this.cs.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  };

  addToCart(product: Prodotto): void{
    this.cs.addToCart(product).subscribe(()=> {
      this.loadCartItems();
    });
  };
  
  removeFromCart(productId: number): void{
    this.cs.removeFromCart(productId).subscribe(()=> {
      this.loadCartItems();
    });
  };
}
