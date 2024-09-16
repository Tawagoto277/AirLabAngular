import { Component, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Filtro, Prodotto } from '../../models/shoeData';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  constructor(
    public sds : ShoeDataServiceService, 
    private route: ActivatedRoute,
    public cs: CartService
  ){ }
  
  product: Prodotto | null = null;
  paginaId: string | null = null;

  selectedColor: string | null = null;
  selectedSize: number | null = null;

  ngOnInit(): void {
    this.paginaId = this.route.snapshot.paramMap.get('id');

    if(this.paginaId){
      const filters: Filtro = {id : parseInt(this.paginaId)};

      this.sds.getFilteredShoes(filters).subscribe(res => {
        if (Array.isArray(res)) {
          this.product = res[0]; // Assumendo che la risposta sia un array con un solo elemento
        } else {
          this.product = res;
        }
      });
    };
  };

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectSize(size: string): void {
    this.selectedSize = parseFloat(size);
  }

  addToCart(): void{
    if(this.selectedColor && this.selectedSize){
      this.cs.updateCartItem(this.product!, 1, this.selectedSize, this.selectedColor);
    }
  }
};
