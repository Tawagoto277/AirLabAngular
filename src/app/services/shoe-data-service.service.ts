import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Banner, Filtro, Prodotto } from '../models/shoeData';

@Injectable({
  providedIn: 'root'
})
export class ShoeDataServiceService {

  constructor(private http: HttpClient) { }

  getFullImageUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:3000';
    return `${baseUrl}${imagePath}`;
  }

  getBanner(tipo: string): Observable<Banner[]>{
    return this.http.get<Banner[]>('http://localhost:3000/' + tipo);
  };

  getFilteredShoes(filters?: Filtro): Observable<Prodotto[] | Prodotto> {

    let params = new HttpParams();
  
    if (filters) {
      if (filters.id !== undefined) {
        params = params.set('id', filters.id.toString());
      }
      if (filters.nome) {
        params = params.set('nome', filters.nome);
      }
      if (filters.categoria) {
        params = params.set('categoria', filters.categoria);
      }
      if (filters.prezzo !== undefined) {
        params = params.set('prezzo', filters.prezzo.toString());
      }
      if (filters.taglie_disponibili && filters.taglie_disponibili.length > 0) {
        params = params.set('taglie_disponibili', filters.taglie_disponibili.join(','));
      }
      if (filters.colori_disponibili && filters.colori_disponibili.length > 0) {
        params = params.set('colori_disponibili', filters.colori_disponibili.join(','));
      }
      if (filters.descrizione) {
        params = params.set('descrizione', filters.descrizione);
      }
      if (filters.immagine) {
        params = params.set('immagine', filters.immagine);
      }
      if (filters.nuovo_arrivi !== undefined) {
        params = params.set('nuovo_arrivi', filters.nuovo_arrivi.toString());
      }
      if (filters.best_seller !== undefined) {
        params = params.set('best_seller', filters.best_seller.toString());
      }
    }
  
    return this.http.get<Prodotto[] | Prodotto>('http://localhost:3000/prodotti', { params }).pipe(map(response => {

      if (Array.isArray(response)) {
        return response;
      }
      return [response];
    }));

    
  }
}
