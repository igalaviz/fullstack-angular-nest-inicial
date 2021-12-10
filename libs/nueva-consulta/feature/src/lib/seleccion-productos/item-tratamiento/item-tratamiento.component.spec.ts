import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTratamientoComponent } from './item-tratamiento.component';

describe('ItemTratamientoComponent', () => {
  let component: ItemTratamientoComponent;
  let fixture: ComponentFixture<ItemTratamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTratamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
