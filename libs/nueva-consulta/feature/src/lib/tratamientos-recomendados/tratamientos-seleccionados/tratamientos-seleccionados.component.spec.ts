import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosSeleccionadosComponent } from './tratamientos-seleccionados.component';

describe('TratamientosSeleccionadosComponent', () => {
  let component: TratamientosSeleccionadosComponent;
  let fixture: ComponentFixture<TratamientosSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientosSeleccionadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientosSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
