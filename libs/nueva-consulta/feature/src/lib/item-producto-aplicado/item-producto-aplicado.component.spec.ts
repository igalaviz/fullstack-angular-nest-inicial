import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductoAplicadoComponent } from './item-producto-aplicado.component';

describe('ItemProductoAplicadoComponent', () => {
  let component: ItemProductoAplicadoComponent;
  let fixture: ComponentFixture<ItemProductoAplicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProductoAplicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProductoAplicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
