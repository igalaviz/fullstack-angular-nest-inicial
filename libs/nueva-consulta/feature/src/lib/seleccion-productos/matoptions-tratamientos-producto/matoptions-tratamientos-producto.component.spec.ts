import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatoptionsTratamientosProductoComponent } from './matoptions-tratamientos-producto.component';

describe('MatoptionsTratamientosProductoComponent', () => {
  let component: MatoptionsTratamientosProductoComponent;
  let fixture: ComponentFixture<MatoptionsTratamientosProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatoptionsTratamientosProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatoptionsTratamientosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
