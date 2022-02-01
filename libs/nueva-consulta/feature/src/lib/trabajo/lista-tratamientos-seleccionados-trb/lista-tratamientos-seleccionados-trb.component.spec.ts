import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTratamientosSeleccionadosTrbComponent } from './lista-tratamientos-seleccionados-trb.component';

describe('ListaTratamientosSeleccionadosTrbComponent', () => {
  let component: ListaTratamientosSeleccionadosTrbComponent;
  let fixture: ComponentFixture<ListaTratamientosSeleccionadosTrbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTratamientosSeleccionadosTrbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTratamientosSeleccionadosTrbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
