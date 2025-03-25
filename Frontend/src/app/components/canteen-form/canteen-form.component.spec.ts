import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenFormComponent } from './canteen-form.component';

describe('CanteenFormComponent', () => {
  let component: CanteenFormComponent;
  let fixture: ComponentFixture<CanteenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanteenFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanteenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
