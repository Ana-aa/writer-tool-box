import { Component, ElementRef, Input, Output, ViewChild, EventEmitter, signal } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-push-preview',
  imports: [
    DevicePreview,
    NgClass,
    FormsModule
  ],
  templateUrl: './push-preview.component.html',
  styleUrl: './push-preview.component.scss',
})
export class PushPreview {
  @Input() limitTitleClose = 25;
  @Input() limitTitleExpanded = 54;
  @Input() limitBodyClose = 30;
  @Input() limitBodyExpanded = 93;

  @Output() limitChangeTitleClose = new EventEmitter<number>();
  @Output() limitChangeTitleExpanded = new EventEmitter<number>();
  @Output() limitChangeBodyClose = new EventEmitter<number>();
  @Output() limitChangeBodyExpanded = new EventEmitter<number>();

  charCount = 0;
  charCountTitle = 0;
  charCountBody = 0;

  public readonly pushWarning = 'Você atingiu o limite do push fechado. Para visualização completa, clique na seta para abrir o push.'

  @ViewChild('charPreview') charPreview!: ElementRef

  currentTitle = '';
  currentBody = '';

  push = [
    {
      title: '',
      body: ''
    }
  ]

  isExpanded = false;

  private syncCountFromPush(): void {
    const firstPush = this.push[0] ?? {title: '', body: ''};
    this.charCountTitle = firstPush.title.length;
    this.charCountBody = firstPush.body.length;
  }


  private applyLimitsToPush(): void {
    this.push = this.push.map((push) => ({
      title: push.title.slice(0, this.limitTitleClose),
      body: push.body.slice(0, this.limitBodyClose),
    }));

    this.syncCountFromPush();
  }

  onInputChangeTitle(event: any) {
    const value = Number(event.target.value);
    this.limitChangeTitleClose.emit(value);
  }
  
  onInputChangeBody(event: any) {
    const value = Number(event.target.value);
    this.limitChangeBodyClose.emit(value);
  }

  onTitleChange(value: string | Event, index: number) {
    const inputValue = typeof value === 'string' ? value : (value.target as HTMLTextAreaElement).value;
    const limitedValue = inputValue.slice(0, this.limitTitleClose);

    this.push[index].title = limitedValue;
    this.charCountTitle = limitedValue.length;
  }

  onBodyChange(value: string | Event, index: number) {
    const inputValue = typeof value === 'string' ? value : (value.target as HTMLTextAreaElement).value;
    const limitedValue = inputValue.slice(0, this.limitBodyClose);

    this.push[index].body = limitedValue;
    this.charCountBody = limitedValue.length;
  }

  onTitleLimitChange(value: number) {
    this.limitTitleClose = value;
    this.applyLimitsToPush();
  }

  onBodyLimitChange(value: number) {
    this.limitBodyClose = value;
    this.applyLimitsToPush();
  }

  clearPush() {
    this.push = [
      {
        title: '',
        body: ''
      }
    ];

    this.currentTitle = '';
    this.charCountTitle = 0;

    this.currentBody = '';
    this.charCountBody = 0;
  }

  getStatusTitle(): string {
    if (this.charCountTitle >= this.limitTitleClose) {
      return 'danger';
    } else if (this.charCountTitle >= this.limitTitleClose * 0.8) {
      return 'warning';
    } else {
      return 'ok'
    }
  }

  getStatusBody(): string {
    if (this.charCountBody >= this.limitBodyClose) {
      return 'danger';
    } else if (this.charCountBody >= this.limitBodyClose * 0.8) {
      return 'warning';
    } else {
      return 'ok'
    }
  }

  @ViewChild('resultCount') resultCount!: ElementRef;

  onTextChange(event: any) {
    this.charCount = event.target.value.length
  }

  getPreviewText(text: string): string {
    if (!text) return '';

    const maxLength = this.isExpanded ? this.limitTitleExpanded : this.limitTitleClose;

    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  getPreviewBody(text: string): string {
    if (!text) return '';

    const maxLength = this.isExpanded ? this.limitBodyExpanded : this.limitBodyClose;

    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  shouldShowWarningPush(index: number): boolean {
    return this.push[index].title.length >= 25 && this.push[index].body.length >= 55;
  }

  alternStateExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  getRotateArrow(): string {
    if (this.isExpanded === false) {
      return 'closed'
    } else {
      return 'open'
    }
  }

  expandedTitlePush(): number {
    return this.isExpanded ? this.limitTitleExpanded : this.limitTitleClose;
  }

  expandedBodyPush(): number {
    return this.isExpanded ? this.limitBodyExpanded : this.limitBodyClose;
  }
}

