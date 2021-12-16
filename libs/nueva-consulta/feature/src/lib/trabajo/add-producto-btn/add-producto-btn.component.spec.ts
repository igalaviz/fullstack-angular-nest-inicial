import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductoBtnComponent } from './add-producto-btn.component';

describe('AddProductoBtnComponent', () => {
  let component: AddProductoBtnComponent;
  let fixture: ComponentFixture<AddProductoBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductoBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductoBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
