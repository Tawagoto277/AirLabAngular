import { Component, Input } from '@angular/core';
import { ShoeDataServiceService } from '../../../services/shoe-data-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  constructor(public sds : ShoeDataServiceService ){ }

  @Input()
  image?:any
    
  getFullImageUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:3000';
    return `${baseUrl}${imagePath}`;
  }
}
