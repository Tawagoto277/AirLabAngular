import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem, Filtro, Prodotto } from '../models/shoeData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl = 'http://localhost:3000/cartItems';

  constructor(private http : HttpClient) { }

  getCartItems(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.cartUrl);
  }

  removeFromCart(productId: string): Observable<Filtro>{
    return this.http.delete<Filtro>(`${this.cartUrl}/${productId}`);
  }

  updateCartItem(product: Prodotto, quantity: number, size: number, color: string): void{
    
    this.http.get<CartItem[]>(this.cartUrl).subscribe(cartItems => {
      const existItem : CartItem | undefined = cartItems.find(item => 
        item.idProdotto === product.id && item.colore === color && item.taglia === size);

      if(existItem){
        existItem.quantita += quantity;
        this.http.put(`${this.cartUrl}/${existItem.id}`, existItem).subscribe();
      }else{
        
        const newItem : CartItem = {
          id : `${product.id}-${size}-${color}`,
          idProdotto : product.id,
          nome: product.nome,
          categoria: product.categoria,
          prezzo: product.prezzo,
          taglia: size,
          colore: color,
          descrizione: product.descrizione,
          immagine: product.immagine,
          best_seller: product.best_seller,
          quantita: quantity,
        };

        this.http.post(this.cartUrl, newItem).subscribe();
      }
    })
  }
}
