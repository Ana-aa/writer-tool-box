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

  it('should allow only one extra preview block', () => {
    expect(component.emails.length).toBe(1);

    component.addNewPeview();
    expect(component.emails.length).toBe(2);

    component.addNewPeview();
    expect(component.emails.length).toBe(2);
  });

  it('should respect the configured character limit for the name field', () => {
    component.limitName = 5;

    component.onNameChange({ target: { value: 'abcdef' } } as unknown as Event, 0);

    expect(component.emails[0].nameEnterprise).toBe('abcde');
    expect(component.charCountName).toBe(5);
  });
});
