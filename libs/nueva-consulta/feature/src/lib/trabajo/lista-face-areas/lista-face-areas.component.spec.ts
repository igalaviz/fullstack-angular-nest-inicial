import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFaceAreasComponent } from './lista-face-areas.component';

describe('ListaFaceAreasComponent', () => {
  let component: ListaFaceAreasComponent;
  let fixture: ComponentFixture<ListaFaceAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFaceAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFaceAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
