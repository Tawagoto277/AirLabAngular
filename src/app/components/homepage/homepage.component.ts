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

  //dovrei specificare il prodotto ma arrivano 2 diversi tipi di oggetti
  sliders: any[] = [];

  //Qui scrivo i titoli per ogni slider
  titoli:string[] = [
    'Nuovi Arrivi',
    'Best Seller - Le scelte dei nostri Clienti',
    'Sport',
    'Membership'
  ];

  //alla creazione dell'componente fa 4 chiamate diverse che racchiudo tutto in 
  //requests = richieste, con forJoin(requests) aspetto che tutte le chiamate siano
  //effetuate per poi passarle a al array slider
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
    //console.log(this.sliders);
  }
}
