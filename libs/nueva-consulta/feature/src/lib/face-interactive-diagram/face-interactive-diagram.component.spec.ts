import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceInteractiveDiagramComponent } from './face-interactive-diagram.component';

describe('FaceInteractiveDiagramComponent', () => {
  let component: FaceInteractiveDiagramComponent;
  let fixture: ComponentFixture<FaceInteractiveDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceInteractiveDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceInteractiveDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
