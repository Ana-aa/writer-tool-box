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
  @Input() limitTitle = 30;
  @Input() limitDescription = 60;
  @Input() limitMessage = 1500;

  charCount = 0;
  charCountTitle = 0;
  charCountDescription = 0;
  charCountMessage = 0;

  @Output() limitChangeTitle = new EventEmitter<number>();
  @Output() limitChangeDescription = new EventEmitter<number>();
  @Output() limitChangeMessage = new EventEmitter<number>();

  public readonly whatsappWarning = 'O WhatsApp pode exibir "Ver mais" em mensagens longas.<br> Este preview utiliza 350 caracteres como referência.'


  private syncCountsFromWpp(): void {
    const firstEmail = this.whatsapp[0] ?? { nameEnterprise: '', headerText: '', preHeaderText: '' };
    this.charCountTitle = firstEmail.title.length;
    this.charCountDescription = firstEmail.description.length;
    this.charCountMessage = firstEmail.message.length;
  }

  private applyLimitsToWpp(): void {
    this.whatsapp = this.whatsapp.map((whatsapp) => ({
      title: whatsapp.title.slice(0, this.limitTitle),
      description: whatsapp.description.slice(0, this.limitDescription),
      message: whatsapp.message.slice(0, this.limitMessage),
    }));

    this.syncCountsFromWpp();
  }

  onInputChangeTitle(event:any) {
    const value = Number(event.target.value);
    this.limitChangeTitle.emit(value);
  }

  onInputChangeDescription(event:any) {
    const value = Number(event.target.value);
    this.limitChangeDescription.emit(value);
  }

  onInputChangeMessage(event:any) {
    const value = Number(event.target.value);
    this.limitChangeMessage.emit(value);
  }

  @ViewChild('charPreview') charPreview!: ElementRef;

  currentTitle = '';
  currentDescription = '';
  currentMessage = '';

  whatsapp = [
    {
      title: '',
      description: '',
      message: ''
    }
  ]

  onTitleChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitTitle);
    textarea.value = limitedValue;
    this.whatsapp[index].title = limitedValue;
    this.charCountTitle = limitedValue.length;
  }

  onDescriptionChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitDescription);
    textarea.value = limitedValue;
    this.whatsapp[index].description = limitedValue;
    this.charCountDescription = limitedValue.length;
  }

  onMessageChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitMessage);
    textarea.value = limitedValue;
    this.whatsapp[index].message = limitedValue;
    this.charCountMessage = limitedValue.length;
  }

  onTitleLimitChange(value: number) {
    this.limitTitle = value;
    this.applyLimitsToWpp();
  }

  onDescriptionLimitChange(value: number) {
    this.limitDescription = value;
    this.applyLimitsToWpp();
  }

  onMessageLimitChange(value: number) {
    this.limitMessage = value;
    this.applyLimitsToWpp();
  }

  clearWpp() {
    this.whatsapp = [{
      title: '',
      description: '',
      message: ''
    }];

    this.currentTitle = '';
    this.currentDescription = '';
    this.currentMessage = '';

    this.charCountTitle = 0;
    this.charCountDescription = 0;
    this.charCountMessage = 0;
  }

  getStatusTitle(): string {
    if (this.charCountTitle >= this.limitTitle) {
      return 'danger';
    } else if (this.charCountTitle >= this.limitTitle * 0.8) {
      return 'warning';
    } else {
      return 'ok;'
    }
  }

  getStatusDescription(): string {
    if (this.charCountDescription >= this.limitDescription) {
      return 'danger';
    } else if (this.charCountDescription >= this.limitDescription * 0.8) {
      return 'warning';
    } else {
      return 'ok;'
    }
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
