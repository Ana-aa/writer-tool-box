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
  @Input() limitButton = 25;
  @Input() limitButtonTwo = 25;

  charCount = 0;
  charCountMessage = 0;
  charCountButton = 0;
  charCountButtonTwo = 0;

  @Output() limitChangeMessage = new EventEmitter<number>();
  @Output() limitChangeButton = new EventEmitter<number>();
  @Output() limitChangeButtonTwo = new EventEmitter<number>();

  public readonly whatsappWarning = 'O WhatsApp pode exibir "Ver mais" em mensagens longas.<br> Este preview utiliza 350 caracteres como referência.'
  
  private syncCountsFromWpp(): void {
    const firstWpp = this.whatsapp[0] ?? { message: '', button: '', buttonTwo: '' };
    this.charCountMessage = firstWpp.message.length;
    this.charCountButton = firstWpp.button.length;
    this.charCountButtonTwo = firstWpp.buttonTwo.length;
  }

  private applyLimitsToWpp(): void {
    this.whatsapp = this.whatsapp.map((whatsapp) => ({
      message: whatsapp.message.slice(0, this.limitMessage),
      button: whatsapp.button.slice(0, this.limitButton),
      buttonTwo: whatsapp.buttonTwo.slice(0, this.limitButtonTwo),
    }));

    this.syncCountsFromWpp();
  }
  onInputChangeMessage(event:any) {
    const value = Number(event.target.value);
    this.limitChangeMessage.emit(value);
  }

  onInputButtonChange(event: any) {
    const value = Number(event.target.value);
    this.limitChangeButton.emit(value);
  }

  onInputButtonTwoChange(event: any) {
    const value = Number(event.target.value);
    this.limitChangeButtonTwo.emit(value);
  }

  @ViewChild('charPreview') charPreview!: ElementRef;

  currentMessage = '';
  currentButton = '';
  currentButtonTwo = '';

  whatsapp = [
    {
      message: '',
      button: '',
      buttonTwo: ''
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

  onButtonChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitButton);
    textarea.value = limitedValue;
    this.whatsapp[index].button = limitedValue;
    this.charCountButton = limitedValue.length;
  }

  onButtonTwoChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitButtonTwo);
    textarea.value = limitedValue;
    this.whatsapp[index].buttonTwo = limitedValue;
    this.charCountButtonTwo = limitedValue.length;
  }

  onMessageLimitChange(value: number) {
    this.limitMessage = value;
    this.applyLimitsToWpp();
  }

  clearWpp() {
    this.whatsapp = [
      {
        message: '',
        button: '',
        buttonTwo: ''
      }
    ];

    this.currentMessage = '';
    this.charCountMessage = 0;

    this.currentButton = '';
    this.charCountButton = 0;

    this.currentButtonTwo = '';
    this.charCountButtonTwo = 0;
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
