import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPreview } from './email-preview.component';

describe('EmailPreview', () => {
  let component: EmailPreview;
  let fixture: ComponentFixture<EmailPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
