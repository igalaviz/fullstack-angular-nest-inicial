import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductoPorAplicarComponent } from './item-producto-por-aplicar.component';

describe('ItemProductoPorAplicarComponent', () => {
  let component: ItemProductoPorAplicarComponent;
  let fixture: ComponentFixture<ItemProductoPorAplicarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProductoPorAplicarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProductoPorAplicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
