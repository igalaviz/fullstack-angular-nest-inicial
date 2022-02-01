import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedTratamientosListComponent } from './updated-tratamientos-list.component';

describe('UpdatedTratamientosListComponent', () => {
  let component: UpdatedTratamientosListComponent;
  let fixture: ComponentFixture<UpdatedTratamientosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedTratamientosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedTratamientosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
