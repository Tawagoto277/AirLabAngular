import { Component, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Filtro, Prodotto } from '../../models/shoeData';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  constructor(private sds : ShoeDataServiceService, private route: ActivatedRoute){ }
  
  product: Prodotto | null = null;
  paginaId: string | null = null;

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
};
