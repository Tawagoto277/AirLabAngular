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

  products : Prodotto[] = [];

  categories: string[] = [];
  colors:string[] = []
  sizes:string[]=[];
  bestSeller:number[]=[];

  filters:Filtro = {
    nome: '',
    categoria: '',
    colori_disponibili:[],
    taglie_disponibili:[],
    best_seller:undefined,
    nuovo_arrivi: undefined
  };

  filteredProducts = [...this.products];

  ngOnInit(): void {
    //Per posrtate l'utente in cima
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        //Scorri in cima alla pagina
        window.scrollTo(0, 0);
      }
    })
    
    this.route.queryParams.subscribe(params => {
      if(params['category']){
        this.filters.categoria = params['category'];
      };

      if(params['search']){
        this.filters.nome = params['search'];
      }
      this.applyFilters();
    });
    
    this.sds.getFilteredShoes().subscribe(p => {
      if(Array.isArray(p)){
        this.products = p;
      };

      this.setUniqueValues<string>(this.products, 'categoria', this.categories);
      this.setUniqueValues<number>(this.products, 'best_seller', this.bestSeller);
      this.setUniqueValues<string>(this.products, 'colori_disponibili', this.colors);
      this.setUniqueValues<string>(this.products, 'taglie_disponibili', this.sizes);
      
      this.applyFilters();
    }); 
  };

  applyFilters(){this.filteredProducts = this.products.filter(product => {
      
    const matchsName = this.filters.nome ? product.nome.toLowerCase().includes(this.filters.nome.toLowerCase()): true
          
    const matchsCategory = this.filters.categoria ? product.categoria.toLowerCase().includes(this.filters.categoria.toLowerCase()): true

    const coloriDisponibili = this.filters.colori_disponibili || [];
    const prodottiColori = product.colori_disponibili.map(color => color.toLowerCase()); // Converti colori disponibili in minuscolo
    const matchsColor = coloriDisponibili.length > 0 ? coloriDisponibili.some(filterColor =>
      prodottiColori.includes(filterColor.toLowerCase())
    ) : true;
      
    const taglieDisponibili = this.filters.taglie_disponibili || [];
    const matchSize = taglieDisponibili.length > 0 ? taglieDisponibili.some(filterSize => 
      product.taglie_disponibili.includes(filterSize)
    ) : true

    const matchsBSeller = this.filters.best_seller ? product.best_seller == this.filters.best_seller: true

    const matchsNuovoArrivi = this.filters.nuovo_arrivi !== undefined ? product.nuovo_arrivi === this.filters.nuovo_arrivi : true; 
    
    console.log(product.nome, product.colori_disponibili);
    
    return matchsName && matchsCategory && matchsColor && matchSize && matchsBSeller && matchsNuovoArrivi;
  });};

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
    targetArray.length = 0; // Svuota l'array originale
    targetArray.push(...Array.from(uniqueSet).sort());
  };

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

  onNewArrivalsChange(event: any) {
    const isChecked = event.target.checked;
    
    if (isChecked) {
      this.filters.nuovo_arrivi = true;
    } else {
      this.filters.nuovo_arrivi = undefined; 
    }
  };
  
};