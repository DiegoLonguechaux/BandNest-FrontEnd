import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandPersoComponent } from './band-perso.component';

describe('BandPersoComponent', () => {
  let component: BandPersoComponent;
  let fixture: ComponentFixture<BandPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandPersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
