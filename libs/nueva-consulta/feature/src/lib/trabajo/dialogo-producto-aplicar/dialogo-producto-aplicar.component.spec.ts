import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoProductoAplicarComponent } from './dialogo-producto-aplicar.component';

describe('DialogoProductoAplicarComponent', () => {
  let component: DialogoProductoAplicarComponent;
  let fixture: ComponentFixture<DialogoProductoAplicarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoProductoAplicarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoProductoAplicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
