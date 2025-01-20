import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurePersoComponent } from './structure-perso.component';

describe('StructurePersoComponent', () => {
  let component: StructurePersoComponent;
  let fixture: ComponentFixture<StructurePersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructurePersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructurePersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
