import { Component, OnInit } from '@angular/core';
import { CartItem, Prodotto } from '../../models/shoeData';
import { CartService } from '../../services/cart-service.service';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  
  constructor(private cs : CartService, private sds:ShoeDataServiceService){}

  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.loadCartItems();
  };

  loadCartItems():void{
    this.cs.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  };

  addToCart(product: CartItem, taglia:number, colore:string): void{
    
    this.sds.getFilteredShoes({id : product.idProdotto}).subscribe( item => {

      if(Array.isArray(item) && item.length > 0){
        const productPrdotto: Prodotto = item[0];
        
        this.cs.updateCartItem(productPrdotto, 1, taglia, colore);
        this.loadCartItems();
      }
    });
  };

  removeFromCart(productId: string): void{
    const item = this.cartItems.find(i => i.id === productId);

    if(item){
      if(item.quantita > 1){
        item.quantita --;
        this.sds.getFilteredShoes({id : item.idProdotto}).subscribe( UpItem => {

          if(Array.isArray(UpItem) && UpItem.length > 0){
            const productPrdotto: Prodotto = UpItem[0];
            
            this.cs.updateCartItem(productPrdotto, -1, item.taglia, item.colore);
            this.loadCartItems();
          };
        });
      }else{
        this.cs.removeFromCart(productId).subscribe(()=> {
          this.loadCartItems();
        });
      };
    };
  };
}
