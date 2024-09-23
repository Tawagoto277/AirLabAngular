import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements AfterViewInit {

  //Server per manipolare il dom in modo piu sicuro 
  constructor(private rendered: Renderer2){ }

  //identifico il corpo dello slider e il contenitore delle immagini il wrapper
  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('sliderBody') sliderBody!: ElementRef<HTMLDivElement>;

  //Prende le immagini del padre 
  @Input()
  slider: any[]= [];

  //Prende i titoli per i vari Slider
  @Input()
  title:string = '';
  
  //Tiene conto della grandezza della prima immagine per i movimenti con i bottoni
  scrollAmount: number = 0;

  //Faccio questo per calcolare la dimensione delle varie immagini in modo sa spostare con i bottoni 
  //della grandezza delle immmagini, ma dato che devo aspettare il caricamento delle immagini 
  //ho sfruttato afterViewInit
  ngAfterViewInit(): void {
    //si mette in ascolto e quando le immagini sono caricate chiama la funzione per calcolare la grandezza delle 
    //immagini
    this.rendered.listen(this.sliderBody.nativeElement.querySelector('img'), 'load', () =>{
      this.calculateScrollAmount();
    });
  };

  //Calcola solo la grandezza della prima immagine e assegna la grandezza a scrollA
  calculateScrollAmount(){
    const firstImg = this.sliderBody.nativeElement.querySelector('img');
    if(firstImg){
      this.scrollAmount = firstImg.clientWidth;
    }
  };

  //tasti per andare a sinistra e destra con lo slider
  prevSlide(){
    const sliderWrapper = this.sliderWrapper.nativeElement;
    sliderWrapper.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
  };

  nextSlide(){
    const sliderWrapper = this.sliderWrapper.nativeElement;
    sliderWrapper.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
  };
}
