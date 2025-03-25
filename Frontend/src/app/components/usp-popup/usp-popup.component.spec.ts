import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UspPopupComponent } from './usp-popup.component';

describe('UspPopupComponent', () => {
  let component: UspPopupComponent;
  let fixture: ComponentFixture<UspPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UspPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UspPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
