import { Component, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { Filtro, Prodotto } from '../../models/shoeData';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  filtroForm!: FormGroup;
  products: Prodotto[] = [];

  constructor(
    private sds : ShoeDataServiceService,
    private fb: FormBuilder
  ){ }
 
  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      nome: [''], 
      categoria: '', 
      taglie_disponibili: [''], 
      colori_disponibili: [''],
      best_seller: '', 
      nuovo_arrivi: ''
    });

    this.filtroForm.valueChanges.pipe(debounceTime(300)).subscribe((params) => {
      this.getFilteredData(params);
    });

    this.getFilteredData(this.filtroForm.value);
  };

  getFilteredData(params: Filtro): void {
    // Chiama il servizio passando i filtri
    this.sds.getFilteredShoes(params).subscribe(response => {
      if(Array.isArray(response)){
        this.products = response;
        console.log(this.products);
        console.log(response);
      };
    });
  };
};