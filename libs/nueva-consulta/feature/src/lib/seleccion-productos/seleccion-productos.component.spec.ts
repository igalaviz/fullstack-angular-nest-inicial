import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionProductosComponent } from './seleccion-productos.component';

describe('SeleccionProductosComponent', () => {
  let component: SeleccionProductosComponent;
  let fixture: ComponentFixture<SeleccionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
