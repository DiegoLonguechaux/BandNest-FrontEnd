import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPersoComponent } from './room-perso.component';

describe('RoomPersoComponent', () => {
  let component: RoomPersoComponent;
  let fixture: ComponentFixture<RoomPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
