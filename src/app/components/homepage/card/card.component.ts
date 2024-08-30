import { Component, Input, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../../services/shoe-data-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  
  constructor(public sds : ShoeDataServiceService, private route: ActivatedRoute ){ }
  
  productId: string | null = null;
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id'); 
  }

  @Input()
  image?:any
    
  getFullImageUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:3000';
    return `${baseUrl}${imagePath}`;
  }
}
