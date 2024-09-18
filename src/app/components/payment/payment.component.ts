import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  userForm: FormGroup;
  cardFrom: FormGroup;

  currentStep: number = 1;

  constructor(private fb: FormBuilder){ 
    
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
