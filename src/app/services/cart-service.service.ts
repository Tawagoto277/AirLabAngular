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

  //mostra il carrello salvato ne db
  getCartItems(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.cartUrl);
  }

  //rimuove il prodotto
  removeFromCart(productId: string): Observable<Filtro>{
    const sanitizedProductId = productId.replace(/\//g, '%2F');
    return this.http.delete<Filtro>(`${this.cartUrl}/${sanitizedProductId}`);
  }

  //dovrebbe variare la quantita dei prodotti
  updateCartItem(product: Prodotto, quantity: number, size: number, color: string): Observable<void> {
    
    return new Observable<void>((observer) => {

      this.http.get<CartItem[]>(this.cartUrl).subscribe(cartItems => {

        const existItem: CartItem | undefined = cartItems.find(item => 
          item.idProdotto === product.id && item.colore === color && item.taglia === size);
  
        if (existItem) {
          existItem.quantita += quantity;
  
          this.http.put(`${this.cartUrl}/${existItem.id}`, existItem).subscribe({
            next: () => {
              observer.next(); 
              observer.complete();
            },
            error: (err) => observer.error(err)
          });
        } else {

          const newItem: CartItem = {
            id: `${product.id}-${size}-${color}`,
            idProdotto: product.id,
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
  
          this.http.post(this.cartUrl, newItem).subscribe({
            next: () => {
              observer.next(); 
              observer.complete();
            },
            error: (err) => observer.error(err)
          });
        }
      });
    });
  }
}
