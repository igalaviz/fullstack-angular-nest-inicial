import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosAplicadosComponent } from './lista-productos-aplicados.component';

describe('ListaProductosAplicadosComponent', () => {
  let component: ListaProductosAplicadosComponent;
  let fixture: ComponentFixture<ListaProductosAplicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProductosAplicadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProductosAplicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
