import { Component, OnInit } from '@angular/core';
import { ShoeDataServiceService } from '../../services/shoe-data-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  constructor(public sds : ShoeDataServiceService ){  }

  sliders:any[] = [];

  titolo:string[] = [
    'Nuovi Arrivi',
    'Best Seller - Le scelte dei nostri Clienti',
    'Sport',
    'Membership'];

  ngOnInit(): void {    
    const requests = [
      this.sds.getFilteredShoes({nuovo_arrivi : true}),
      this.sds.getFilteredShoes({best_seller : 5}),
      this.sds.getSliderSport(),
      this.sds.getSliderBanner(),
    ];

    // serva a fare le richieste http tutte assieme
    forkJoin(requests).subscribe(res => {
      res.forEach(res => {
        this.sliders.push(res);
      })
    });

    console.log(this.sliders);
  }
}
