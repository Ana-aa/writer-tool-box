import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';
import { NgClass } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-whatsapp-preview',
  imports: [
    DevicePreview,
    NgClass,
    FormsModule
  ],
  templateUrl: './whatsapp-preview.component.html',
  styleUrl: './whatsapp-preview.component.scss',
})
export class WhatsappPreviewComponent {
  @Input() limitMessage = 1500;

  charCount = 0;
  charCountMessage = 0;

  @Output() limitChangeMessage = new EventEmitter<number>();

  public readonly whatsappWarning = 'O WhatsApp pode exibir "Ver mais" em mensagens longas.<br> Este preview utiliza 350 caracteres como referência.'


  private syncCountsFromWpp(): void {
    const firstEmail = this.whatsapp[0] ?? { message: ''};
    this.charCountMessage = firstEmail.message.length;
  }

  private applyLimitsToWpp(): void {
    this.whatsapp = this.whatsapp.map((whatsapp) => ({
      message: whatsapp.message.slice(0, this.limitMessage),
    }));

    this.syncCountsFromWpp();
  }
  onInputChangeMessage(event:any) {
    const value = Number(event.target.value);
    this.limitChangeMessage.emit(value);
  }

  @ViewChild('charPreview') charPreview!: ElementRef;

  currentMessage = '';

  whatsapp = [
    {
      message: ''
    }
  ]


  onMessageChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitMessage);
    textarea.value = limitedValue;
    this.whatsapp[index].message = limitedValue;
    this.charCountMessage = limitedValue.length;
  }

  onMessageLimitChange(value: number) {
    this.limitMessage = value;
    this.applyLimitsToWpp();
  }

  clearWpp() {
    this.whatsapp = [
      {
        message: ''
      }
    ];

    this.currentMessage = '';
    
    this.charCountMessage = 0;
  }

  getStatusMessage(): string {
    if (this.charCountMessage >= this.limitMessage) {
      return 'danger';
    } else if (this.charCountMessage >= this.limitMessage * 0.8) {
      return 'warning';
    } else {
      return 'ok;'
    }
  }

  @ViewChild('resultCount') resultCount!: ElementRef;

  onTextChange(event: any) {
    this.charCount = event.target.value.length;
  }

  getPreviewText(text: string, maxLength = 350): string {
    if (!text) return '';

    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }

    return text;
  }

  shouldShowReadMore(text: string, maxLength = 350): boolean {
    return !!text && text.length > maxLength;
  }

  shouldShowWarningMessage(index: number): boolean {
    return this.whatsapp[index].message.length >= 350;
  }
} 
