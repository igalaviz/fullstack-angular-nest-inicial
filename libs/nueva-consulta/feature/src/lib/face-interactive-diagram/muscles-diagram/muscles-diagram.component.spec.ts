import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusclesDiagramComponent } from './muscles-diagram.component';

describe('MusclesDiagramComponent', () => {
  let component: MusclesDiagramComponent;
  let fixture: ComponentFixture<MusclesDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusclesDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusclesDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
