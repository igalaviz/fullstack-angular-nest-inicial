import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosRecomendadosComponent } from './productos-recomendados.component';

describe('ProductosRecomendadosComponent', () => {
  let component: ProductosRecomendadosComponent;
  let fixture: ComponentFixture<ProductosRecomendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosRecomendadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
