import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnaTratamientosComponent } from './columna-tratamientos.component';

describe('ColumnaTratamientosComponent', () => {
  let component: ColumnaTratamientosComponent;
  let fixture: ComponentFixture<ColumnaTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnaTratamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnaTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
