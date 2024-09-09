import { Component, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { Filtro, Prodotto } from '../../models/shoeData';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  constructor(private sds : ShoeDataServiceService){ }

  products : Prodotto[] = [];
  categories: String[] = [];
  colors:String[] = []
  filters:Filtro = {
    nome: '',
    categoria: '',
    colori_disponibili:[],
  };

  filteredProducts = [...this.products];

  ngOnInit(): void {
    this.sds.getFilteredShoes().subscribe(p => {
      if(Array.isArray(p)){
        this.products = p;
      };

      this.setCategory();
      this.setColor();
    });
  };

  applyFilters(){
    console.log('Filters: ', this.filters);
    
    this.filteredProducts = this.products.filter(product => {
      
      const matchsName = this.filters.nome ? product.nome.toLowerCase().includes(this.filters.nome.toLowerCase()): true
            
      const matchsCategory = this.filters.categoria ? product.categoria.toLowerCase().includes(this.filters.categoria.toLowerCase()): true

      const coloriDisponibili = this.filters.colori_disponibili || [];
      const prodottiColori = product.colori_disponibili.map(color => color.toLowerCase()); // Converti colori disponibili in minuscolo
      const matchsColor = coloriDisponibili.length > 0
      ? coloriDisponibili.some(filterColor =>
          prodottiColori.includes(filterColor.toLowerCase())
        ) : true;

        console.log(`Product ${product.nome} ${product.colori_disponibili}: matchesColor=${matchsColor}`);

      return matchsName && matchsCategory && matchsColor;
    });  
  };

  setCategory(){
    const categorySet = new Set<string>();
    
    this.products.forEach(product => {
      categorySet.add(product.categoria);      
    });

    this.categories = Array.from(categorySet);
  };

  setColor(){
    const colorSet = new Set<string>();

    this.products.forEach(product => {
      
      product.colori_disponibili.forEach( pColor => {        
        colorSet.add(pColor);
      })
    })
    
    this.colors = Array.from(colorSet);
  };

  onColorChange(event : any){
    const color = event.target.value;
    const isChecked = event.target.checked;

    if(isChecked){
      if (!this.filters.colori_disponibili) {
        this.filters.colori_disponibili = [];
      };
      this.filters.colori_disponibili?.push(color);
    }else{
      const index = this.filters.colori_disponibili?.indexOf(color);
      if(index! > -1){
        this.filters.colori_disponibili?.splice(index!, 1);
      };
    };
  };

};