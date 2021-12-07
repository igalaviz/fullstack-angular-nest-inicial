import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpPanelTratamientosRecomendadosComponent } from './exp-panel-tratamientos-recomendados.component';

describe('ExpPanelTratamientosRecomendadosComponent', () => {
  let component: ExpPanelTratamientosRecomendadosComponent;
  let fixture: ComponentFixture<ExpPanelTratamientosRecomendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpPanelTratamientosRecomendadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpPanelTratamientosRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
