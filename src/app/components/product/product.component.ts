import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Filtro, Prodotto } from '../../models/shoeData';
import { CartService } from '../../services/cart-service.service';
import { CartConfirmationComponent } from '../cart-confirmation/cart-confirmation.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  //Per detterminare quale card sara caricata nel carrello
  @ViewChild(CartConfirmationComponent) cartConfirmation!: CartConfirmationComponent;

  constructor(
    public sds : ShoeDataServiceService, 
    private route: ActivatedRoute,
    public cs: CartService
  ){ }
  
  product: Prodotto | null = null;
  paginaId: string | null = null;

  //varibile che tiene conto del colore e taglia
  selectedColor: string | null = null;
  selectedSize: number | null = null;

  ngOnInit(): void {
    //richiama il prdotto per id
    //l'id viene preso dall'indirizzo - URL
    this.paginaId = this.route.snapshot.paramMap.get('id');

    if(this.paginaId){
      const filters: Filtro = {id : parseInt(this.paginaId)};

      this.sds.getFilteredShoes(filters).subscribe(res => {
        if (Array.isArray(res)) {
          this.product = res[0];
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

      this.cartConfirmation.product = this.product!;
      this.cartConfirmation.showConfirmatin();
    }
  }
};
