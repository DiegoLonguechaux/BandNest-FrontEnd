import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosPersoComponent } from './infos-perso.component';

describe('InfosPersoComponent', () => {
  let component: InfosPersoComponent;
  let fixture: ComponentFixture<InfosPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosPersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
