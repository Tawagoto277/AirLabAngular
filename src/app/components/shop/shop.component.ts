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
    
    this.route.params.subscribe(params => {
      if(params['category']){
        this.filters.categoria = params['category'];
      };
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

    // console.log(matchsNuovoArrivi);
    // console.log(product.nuovo_arrivi);
    
    console.log(product.nome, product.colori_disponibili);
    
    return matchsName && matchsCategory && matchsColor && matchSize && matchsBSeller && matchsNuovoArrivi;
  });};

  // setCategory(){
  //   const categorySet = new Set<string>();
    
  //   this.products.forEach(product => {
  //     categorySet.add(product.categoria);      
  //   });

  //   this.categories = Array.from(categorySet).sort();
  // };
  
  // setBestSeller(){
  //   const bSellerSet = new Set<number>();
    
  //   this.products.forEach(product => {
  //     bSellerSet.add(product.best_seller);      
  //   });

  //   this.bestSeller = Array.from(bSellerSet).sort();
  // };

  // setColor(){
  //   const colorSet = new Set<string>();

  //   this.products.forEach(product => {
  //     product.colori_disponibili.forEach( pColor => {        
  //       colorSet.add(pColor);
  //     });
  //   });
    
  //   this.colors = Array.from(colorSet).sort();
  // };

  // setSize(){
  //   const sizeSet = new Set<string>();

  //   this.products.forEach(product => {
  //     product.taglie_disponibili.forEach( tSize => {
  //       sizeSet.add(tSize);
  //     });
  //   });

  //   this.sizes = Array.from(sizeSet).sort();
  // };

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

  // onColorChange(event : any){
  //   const color = event.target.value;
  //   const isChecked = event.target.checked;

  //   if(isChecked){
  //     if (!this.filters.colori_disponibili) {
  //       this.filters.colori_disponibili = [];
  //     };
  //     this.filters.colori_disponibili?.push(color);
  //   }else{
  //     const index = this.filters.colori_disponibili?.indexOf(color);
  //     if(index! > -1){
  //       this.filters.colori_disponibili?.splice(index!, 1);
  //     };
  //   };
  // };
  
  // onSizesChange(event : any){
  //   const size = event.target.value;
  //   const isChecked = event.target.checked;

  //   if(isChecked){
  //     if (!this.filters.taglie_disponibili) {
  //       this.filters.taglie_disponibili = [];
  //     };
  //     this.filters.taglie_disponibili?.push(size);
  //   }else{
  //     const index = this.filters.taglie_disponibili?.indexOf(size);
  //     if(index! > -1){
  //       this.filters.taglie_disponibili?.splice(index!, 1);
  //     };
  //   };
  // };

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