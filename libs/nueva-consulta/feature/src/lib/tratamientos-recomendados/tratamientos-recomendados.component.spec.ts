import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosRecomendadosComponent } from './tratamientos-recomendados.component';

describe('TratamientosRecomendadosComponent', () => {
  let component: TratamientosRecomendadosComponent;
  let fixture: ComponentFixture<TratamientosRecomendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientosRecomendadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientosRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
