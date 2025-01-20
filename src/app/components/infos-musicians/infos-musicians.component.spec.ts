import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosMusiciansComponent } from './infos-musicians.component';

describe('InfosMusiciansComponent', () => {
  let component: InfosMusiciansComponent;
  let fixture: ComponentFixture<InfosMusiciansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosMusiciansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosMusiciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
