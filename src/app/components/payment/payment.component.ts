import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart-service.service';
import { CartItem } from '../../models/shoeData';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{

  cartItems: CartItem[] = [];

  userForm: FormGroup;
  cardFrom: FormGroup;

  currentStep: number = 1;

  constructor(private fb: FormBuilder, public cs: CartService){ 
    
    this.userForm = this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      indirizzo: ['', [Validators.required]],
      citta: ['', [Validators.required]],
      cap: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    })

    this.cardFrom = this.fb.group({
      numeroCarta: ["", [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      scadenza: ["", [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')]],
      cvv: ["", [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    })
  }

  ngOnInit(): void {
    this.cs.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal() : number{
    return this.cartItems.reduce((total, item) => total + (item.prezzo * item.quantita), 0);
  }

  nextStep(){
    if(this.currentStep === 1 && this.userForm.valid){
      this.currentStep = 2;
    }else if(this.currentStep === 2 && this.cardFrom.valid){
      this.currentStep = 3;
    };
  }

  previousStep(){
    if(this.currentStep > 1){
      this.currentStep--;
    };
  }

  confirmPayment(){
    if(this.cardFrom.valid){
      this.currentStep = 4;
    };
  }
}
