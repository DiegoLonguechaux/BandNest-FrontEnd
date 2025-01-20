import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPersoComponent } from './booking-perso.component';

describe('BookingPersoComponent', () => {
  let component: BookingPersoComponent;
  let fixture: ComponentFixture<BookingPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
