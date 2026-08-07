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

  it('should render the body input value in the preview', () => {
    const textareas = fixture.nativeElement.querySelectorAll('textarea');
    const bodyTextarea = textareas[1] as HTMLTextAreaElement;

    bodyTextarea.value = 'Mensagem de teste do body';
    bodyTextarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const previewText = fixture.nativeElement.querySelector('.push-container__text')?.textContent?.trim();
    expect(previewText).toContain('Mensagem de teste do body');
  });
});
