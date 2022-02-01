import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnaTratamientosSeleccionadosComponent } from './columna-tratamientos-seleccionados.component';

describe('ColumnaTratamientosSeleccionadosComponent', () => {
  let component: ColumnaTratamientosSeleccionadosComponent;
  let fixture: ComponentFixture<ColumnaTratamientosSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnaTratamientosSeleccionadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnaTratamientosSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
