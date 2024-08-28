import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ShoeDataServiceService } from '../../../services/shoe-data-service.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements AfterViewInit {
  constructor(public sds: ShoeDataServiceService, private rendered: Renderer2){ }

  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('sliderBody') sliderBody!: ElementRef<HTMLDivElement>;

  @Input()
  slider: any[]= [];

  @Input()
  title:string = '';
  
  scrollAmount: number = 0;

  ngAfterViewInit(): void {
    this.rendered.listen(this.sliderBody.nativeElement.querySelector('img'), 'load', () =>{
      this.calculateScrollAmount();
    });
  };

  calculateScrollAmount(){
    const firstImg = this.sliderBody.nativeElement.querySelector('img');
    if(firstImg){
      this.scrollAmount = firstImg.clientWidth;
      // console.log(firstImg);
      // console.log(firstImg.clientWidth);
    }
  };

  prevSlide(){
    const sliderWrapper = this.sliderWrapper.nativeElement;
    sliderWrapper.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
  };

  nextSlide(){
    const sliderWrapper = this.sliderWrapper.nativeElement;
    sliderWrapper.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
  };
}
