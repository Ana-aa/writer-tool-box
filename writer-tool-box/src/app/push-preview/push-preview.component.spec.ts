import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushPreview } from './push-preview.component';

describe('PushPreview', () => {
  let component: PushPreview;
  let fixture: ComponentFixture<PushPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(PushPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
