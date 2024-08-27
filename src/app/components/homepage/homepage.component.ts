import { Component, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { Prodotti, Slider } from '../../models/shoeData';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  constructor(public sds : ShoeDataServiceService ){  }

  shoes: Prodotti[] = [];

  sliders: Slider[]= [];

  ngOnInit(): void {
    // this.sds.getShoes().subscribe(shoesDati => {
    //   console.log(shoesDati);
    //   this.shoes = shoesDati;
    // })
    
    // this.sds.getFilteredShoes("Sneakers").subscribe(shoesDati => {
    //   console.log(shoesDati);
    //   this.shoes = shoesDati;
    // })

    this.sds.getSliderHome().subscribe(arrayS => {
      console.log(arrayS);
      this.sliders = arrayS;
    })

    let filtro = {
      best_seller : 2
    }

    this.sds.getFilteredShoes().subscribe(s => {
      console.log(s);
    })
  }

  getFullImageUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:3000';
    return `${baseUrl}${imagePath}`;
  }
}
