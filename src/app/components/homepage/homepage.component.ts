import { Component, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { forkJoin } from 'rxjs';
import { Banner, Prodotto } from '../../models/shoeData';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  constructor(public sds : ShoeDataServiceService ){  }

  // sliders:(Prodotto[] | Banner[])[] = [];
  sliders: any[] = [];

  titoli:string[] = [
    'Nuovi Arrivi',
    'Best Seller - Le scelte dei nostri Clienti',
    'Sport',
    'Membership'];

  ngOnInit(): void {    
    const requests = [
      this.sds.getFilteredShoes({nuovo_arrivi : true}),
      this.sds.getFilteredShoes({best_seller : 5}),
      this.sds.getBanner('sport'),
      this.sds.getBanner('banner'),
    ];

    forkJoin(requests).subscribe(responses => {
      responses.forEach(response =>{
        this.sliders.push(response);
      })
    });

    console.log(this.sliders);
  }
}
