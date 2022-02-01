import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiagnosticosComponent } from './list-diagnosticos.component';

describe('ListDiagnosticosComponent', () => {
  let component: ListDiagnosticosComponent;
  let fixture: ComponentFixture<ListDiagnosticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDiagnosticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDiagnosticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
