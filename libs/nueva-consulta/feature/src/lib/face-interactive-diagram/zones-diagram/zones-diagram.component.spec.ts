import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesDiagramComponent } from './zones-diagram.component';

describe('ZonesDiagramComponent', () => {
  let component: ZonesDiagramComponent;
  let fixture: ComponentFixture<ZonesDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonesDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
