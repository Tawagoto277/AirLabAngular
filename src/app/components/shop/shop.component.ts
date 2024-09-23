import { Component, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { Filtro, Prodotto } from '../../models/shoeData';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  constructor(
      private sds : ShoeDataServiceService, 
      private route : ActivatedRoute,
      private router: Router
  ){ }

  //Array che tiene tutti i prodotti non filtrati
  products : Prodotto[] = [];

  //prende le diverse categorie da tutti i prodotti in modo da scrivere nel filtro tutte le possibilita
  //usando un array set
  categories: string[] = [];
  colors:string[] = []
  sizes:string[]=[];
  bestSeller:number[]=[];

  //Tiene conto di tutti i flitri selezionati, infatti utilizzo l'oggetto filtro che e come prodotto ma 
  //nessun campo e' obbligatorio
  filters:Filtro = {
    nome: '',
    categoria: '',
    colori_disponibili:[],
    taglie_disponibili:[],
    best_seller:undefined,
    nuovo_arrivi: undefined
  };

  //Carica tutti i prodotti filtrati
  filteredProducts = [...this.products];

  ngOnInit(): void {
    //Per posrtate l'utente in cima
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        window.scrollTo(0, 0);
      }
    })
    
    this.route.queryParams.subscribe(params => {
      //aggiunge la ricerca per categoria tramite le immagini della homepage
      if(params['category']){
        this.filters.categoria = params['category'];
      };

      //aggiunge la ricerca per nome tramite l'input nel header
      if(params['search']){
        this.filters.nome = params['search'];
      }
      //chiama il metodo per visualizare i prodotti
      this.applyFilters();
    });
    
    //inizializa i prodotti senza nessun filtro
    this.sds.getFilteredShoes().subscribe(p => {
      if(Array.isArray(p)){
        this.products = p;
      };

      //identifica i vari valori per por creare ogni tipologia di filtro
      this.setUniqueValues<string>(this.products, 'categoria', this.categories);
      this.setUniqueValues<number>(this.products, 'best_seller', this.bestSeller);
      this.setUniqueValues<string>(this.products, 'colori_disponibili', this.colors);
      this.setUniqueValues<string>(this.products, 'taglie_disponibili', this.sizes);
      
      this.applyFilters();
    }); 
  };

  //prende larray prducts e filtra per ogni chiava e li carica su filteredP che poi vengono mostrati, in modo da fare una chiamata con tutti i prodotti e 
  //filatrre il risulatto, non migliaia di prodotti non e il massimo delle performance
  applyFilters(){
    this.filteredProducts = this.products.filter(product => {
      
      //Filtra se ce un filtro per nome
      const matchsName = this.filters.nome ? product.nome.toLowerCase().includes(this.filters.nome.toLowerCase()): true
            
      //Filtra se ce un filtro per categoria
      const matchsCategory = this.filters.categoria ? product.categoria.toLowerCase().includes(this.filters.categoria.toLowerCase()): true
      
      //Filtra se ce un filtro per colore
      const coloriDisponibili = this.filters.colori_disponibili || [];
      const prodottiColori = product.colori_disponibili.map(color => color.toLowerCase()); // Converti colori disponibili in minuscolo
      const matchsColor = coloriDisponibili.length > 0 ? coloriDisponibili.some(filterColor =>
        prodottiColori.includes(filterColor.toLowerCase())
      ) : true;
        
      //Filtra se ce un filtro per taglia
      const taglieDisponibili = this.filters.taglie_disponibili || [];
      const matchSize = taglieDisponibili.length > 0 ? taglieDisponibili.some(filterSize => 
        product.taglie_disponibili.includes(filterSize)
      ) : true

      //Ho inteso best seller come la media di stelle riceute
      //Filtra se ce un filtro per best seller o rating
      const matchsBSeller = this.filters.best_seller ? product.best_seller == this.filters.best_seller: true

      //Filtra se ce un filtro per nuovi arrivi
      const matchsNuovoArrivi = this.filters.nuovo_arrivi !== undefined ? product.nuovo_arrivi === this.filters.nuovo_arrivi : true; 
      
      
      return matchsName && matchsCategory && matchsColor && matchSize && matchsBSeller && matchsNuovoArrivi;
    });
  };

  //serve a creare i filtri, in base ai parametri passati crea le opzioni per i vari filtri
  //con un array di tipo set che trattiene solo elementi unici, non doppioni
  setUniqueValues<T>(products: Prodotto[], property: keyof Prodotto, targetArray: T[]): void {
    const uniqueSet = new Set<T>();
  
    products.forEach(product => {
      const value = product[property];
  
      if (Array.isArray(value)) {
        value.forEach(item => uniqueSet.add(item as T));
      } else {
        uniqueSet.add(value as T);
      }
    });
  
    // Ordina i valori unici e li assegna al target array
    targetArray.length = 0;
    targetArray.push(...Array.from(uniqueSet).sort());
  };

  //Serve per filtarre con gli array, piu elementi a differenza di xategoria che ogni prodotto ne ha una, i colori e taglie 
  //sono presenti in diverse quantita per prodotto
  onFilterChange(event: any, filterType: 'colori_disponibili' | 'taglie_disponibili') {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!this.filters[filterType]) {
        this.filters[filterType] = [];
      }
      this.filters[filterType].push(value);
    } else {
      const index = this.filters[filterType]?.indexOf(value);
      if (index! > -1) {
        this.filters[filterType]?.splice(index!, 1);
      }
    }
  }

  //per porre il checked true
  onNewArrivalsChange(event: any) {
    const isChecked = event.target.checked;
    
    if (isChecked) {
      this.filters.nuovo_arrivi = true;
    } else {
      this.filters.nuovo_arrivi = undefined; 
    }
  };
  
};