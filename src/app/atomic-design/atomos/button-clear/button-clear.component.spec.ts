import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonClearComponent } from './button-clear.component';

describe('ButtonClearComponent', () => {
  let component: ButtonClearComponent;
  let fixture: ComponentFixture<ButtonClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonClearComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonClearComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
