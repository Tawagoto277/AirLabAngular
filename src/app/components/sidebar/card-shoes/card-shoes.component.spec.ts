import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShoesComponent } from './card-shoes.component';

describe('CardShoesComponent', () => {
  let component: CardShoesComponent;
  let fixture: ComponentFixture<CardShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardShoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
