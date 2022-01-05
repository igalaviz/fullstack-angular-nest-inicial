import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiplistTratamientosProductoComponent } from './chiplist-tratamientos-producto.component';

describe('ChiplistTratamientosProductoComponent', () => {
  let component: ChiplistTratamientosProductoComponent;
  let fixture: ComponentFixture<ChiplistTratamientosProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiplistTratamientosProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiplistTratamientosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
