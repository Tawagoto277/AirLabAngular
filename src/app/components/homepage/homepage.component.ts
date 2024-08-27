import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { Prodotti, Slider } from '../../models/shoeData';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  constructor(public sds : ShoeDataServiceService ){  }
  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('sliderBody') sliderBody!: ElementRef<HTMLDivElement>;

  banners:Slider[] = [];

  ngOnInit(): void {
    this.sds.getSliderBanner().subscribe(res => {
      console.log(res);
      this.banners = res;
    })
  }

  getFullImageUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:3000';
    return `${baseUrl}${imagePath}`;
  }

  scrollAmount : number = 620;
  // lunghezza immagine

  prevSlide(){
    const sliderWrapper = this.sliderWrapper.nativeElement;
    sliderWrapper.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
  }

  nextSlide(){
    const sliderWrapper = this.sliderWrapper.nativeElement;
    sliderWrapper.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
  }
}
