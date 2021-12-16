import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosPorAplicarComponent } from './lista-productos-por-aplicar.component';

describe('ListaProductosPorAplicarComponent', () => {
  let component: ListaProductosPorAplicarComponent;
  let fixture: ComponentFixture<ListaProductosPorAplicarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProductosPorAplicarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProductosPorAplicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
