import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoExpPanelComponent } from './diagnostico-exp-panel.component';

describe('DiagnosticoExpPanelComponent', () => {
  let component: DiagnosticoExpPanelComponent;
  let fixture: ComponentFixture<DiagnosticoExpPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticoExpPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoExpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
