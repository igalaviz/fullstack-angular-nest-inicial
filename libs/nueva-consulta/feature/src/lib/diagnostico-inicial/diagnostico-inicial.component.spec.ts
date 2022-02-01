import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoInicialComponent } from './diagnostico-inicial.component';

describe('DiagnosticoInicialComponent', () => {
  let component: DiagnosticoInicialComponent;
  let fixture: ComponentFixture<DiagnosticoInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticoInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
