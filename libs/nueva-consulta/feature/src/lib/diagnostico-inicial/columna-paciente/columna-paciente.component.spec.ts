import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnaPacienteComponent } from './columna-paciente.component';

describe('ColumnaPacienteComponent', () => {
  let component: ColumnaPacienteComponent;
  let fixture: ComponentFixture<ColumnaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnaPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
