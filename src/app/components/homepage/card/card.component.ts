import { Component, Input } from '@angular/core';
import { Slider } from '../../../models/shoeData';
import { ShoeDataServiceService } from '../../../services/shoe-data-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  constructor(public sds : ShoeDataServiceService ){ }

  @Input()
  image?:Slider

    
  getFullImageUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:3000';
    return `${baseUrl}${imagePath}`;
  }
}
