import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnaCaraComponent } from './columna-cara.component';

describe('ColumnaCaraComponent', () => {
  let component: ColumnaCaraComponent;
  let fixture: ComponentFixture<ColumnaCaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnaCaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnaCaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
