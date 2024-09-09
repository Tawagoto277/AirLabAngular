import { Component, Input } from '@angular/core';
import { Prodotto } from '../../../models/shoeData';
import { ShoeDataServiceService } from '../../../services/shoe-data-service.service';

@Component({
  selector: 'app-card-p',
  templateUrl: './card-p.component.html',
  styleUrl: './card-p.component.scss'
})
export class CardPComponent {

  constructor(public sds: ShoeDataServiceService){ }

  @Input()
  product?:Prodotto
}
