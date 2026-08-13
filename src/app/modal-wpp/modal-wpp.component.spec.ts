import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWppComponent } from './modal-wpp.component';

describe('ModalWppComponent', () => {
  let component: ModalWppComponent;
  let fixture: ComponentFixture<ModalWppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalWppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalWppComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
