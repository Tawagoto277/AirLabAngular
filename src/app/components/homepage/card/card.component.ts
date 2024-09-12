import { Component, Input, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../../services/shoe-data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Prodotto } from '../../../models/shoeData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  
  constructor(public sds : ShoeDataServiceService, private route: ActivatedRoute ){ }
  
  ngOnInit(): void {
    console.log(this.image);
  }
  
  @Input()
  image?:any
}
