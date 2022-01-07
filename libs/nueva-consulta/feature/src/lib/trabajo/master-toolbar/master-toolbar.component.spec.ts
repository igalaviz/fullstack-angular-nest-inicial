import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterToolbarComponent } from './master-toolbar.component';

describe('MasterToolbarComponent', () => {
  let component: MasterToolbarComponent;
  let fixture: ComponentFixture<MasterToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
