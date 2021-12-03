import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnaMedicoComponent } from './columna-medico.component';

describe('ColumnaMedicoComponent', () => {
  let component: ColumnaMedicoComponent;
  let fixture: ComponentFixture<ColumnaMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnaMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
