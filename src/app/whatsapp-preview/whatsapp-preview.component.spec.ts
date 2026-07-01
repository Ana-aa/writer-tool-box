import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappPreviewComponent } from './whatsapp-preview.component';

describe('WhatsappPreviewComponent', () => {
  let component: WhatsappPreviewComponent;
  let fixture: ComponentFixture<WhatsappPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsappPreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
