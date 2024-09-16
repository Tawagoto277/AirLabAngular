import { HttpClient } from '@angular/common/http';
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

  removeFromCart(productId: number): Observable<Filtro>{
    return this.http.delete<Filtro>(`${this.cartUrl}/${productId}`);
  }

  updateCartItem(prodict: Prodotto, quantity: number, size: number, color: string): void{
    
    this.http.get<CartItem[]>(this.cartUrl).subscribe(cartItems => {
      const existItem : CartItem | undefined = cartItems.find(item => item.id === prodict.id);

      if(existItem){
        existItem.quantita += quantity;
        this.http.put(`${this.cartUrl}/${existItem.id}`, existItem).subscribe();
      }else{
        
        const newItem : CartItem = {
          id : prodict.id,
          nome: prodict.nome,
          categoria: prodict.categoria,
          prezzo: prodict.prezzo,
          taglia: size,
          colore: color,
          descrizione: prodict.descrizione,
          immagine: prodict.immagine,
          rating: prodict.best_seller,
          quantita: quantity,
        };

        this.http.post(this.cartUrl, newItem).subscribe();
      }
    })
  }
}
