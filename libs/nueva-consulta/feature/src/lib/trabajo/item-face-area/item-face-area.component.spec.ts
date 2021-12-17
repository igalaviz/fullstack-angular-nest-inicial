import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFaceAreaComponent } from './item-face-area.component';

describe('ItemFaceAreaComponent', () => {
  let component: ItemFaceAreaComponent;
  let fixture: ComponentFixture<ItemFaceAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFaceAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFaceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
