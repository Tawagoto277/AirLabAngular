import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prodotti, Slider } from '../models/shoeData';

@Injectable({
  providedIn: 'root'
})
export class ShoeDataServiceService {

  constructor(private http: HttpClient) { }

  getSliderBanner(): Observable<Slider[]>{
    return this.http.get<Slider[]>('http://localhost:3000/banner');
  };
  
  getSliderSport(): Observable<Slider[]>{
    return this.http.get<Slider[]>('http://localhost:3000/sport');
  };

  getFilteredShoes( filters?: {
    id?: number;
    nome?: string;
    categoria?: string;
    prezzo?: number;
    taglie_disponibili?: string[];
    colori_disponibili?: string[];
    descrizione?: string;
    immagine?: string;
    nuovo_arrivi?: boolean;
    best_seller?: number;
    }): Observable<Prodotti[]>{

      let params = new HttpParams();

      if(filters){
        if (filters.id !== undefined) {
          params = params.set('id', filters.id.toString());
        };
        if(filters.nome){
          params = params.set('nome', filters.nome);
        };
        if(filters.categoria){
          params = params.set('categoria', filters.categoria);
        };
        if(filters.prezzo !== undefined){
          params = params.set('prezzo', filters.prezzo);
        };
        if(filters.taglie_disponibili && filters.taglie_disponibili.length > 0){
          params = params.set('taglie_disponibili', filters.taglie_disponibili.join(','));
        };
        if(filters.colori_disponibili && filters.colori_disponibili.length > 0){
          params = params.set('colori_disponibili', filters.colori_disponibili.join(','));
        };
        if(filters.descrizione){
          params = params.set('descrizione', filters.descrizione);
        };
        if(filters.immagine){
          params = params.set('immagine', filters.immagine);
        };
        if(filters.nuovo_arrivi !== undefined){
          params = params.set('nuovi_arrivo', filters.nuovo_arrivi.toString());
        };
        if(filters.best_seller !== undefined){
          params = params.set('best_seller', filters.best_seller.toString());
        };
      }
      
    return this.http.get<Prodotti[]>('http://localhost:3000/prodotti', {params});
  };
}
