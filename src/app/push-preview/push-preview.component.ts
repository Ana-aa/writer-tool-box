import { Component, ElementRef, Input, Output, ViewChild, EventEmitter, signal } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from "../atomic-design/organismos/text-input/text-input.component";
import { ButtonClearComponent } from "../atomic-design/atomos/button-clear/button-clear.component";
import { ConfigurationCountComponent } from "../configuration/configuration-count.component";

@Component({
  selector: 'app-push-preview',
  imports: [
    DevicePreview,
    NgClass,
    FormsModule,
    TextInputComponent,
    ButtonClearComponent,
    ConfigurationCountComponent
],
  templateUrl: './push-preview.component.html',
  styleUrl: './push-preview.component.scss',
})
export class PushPreview {
  @Input() limitTitle = 30;
  @Input() limitBody = 94;

  @Output() limitChangeTitle = new EventEmitter<number>();
  @Output() limitChangeBody = new EventEmitter<number>();

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
      title: push.title.slice(0, this.limitTitle),
      body: push.body.slice(0, this.limitBody),
    }));

    this.syncCountFromPush();
  }

  // Recebe o evento do input configurável e emite o novo limite para o título
  onNewLimitChangeTitle(event: any) {
    const value = Number(event.target.value);
    this.limitChangeTitle.emit(value);
  }

  // Recebe o evento do input configurável e emite o novo limite para o corpo
  onNewLimitChangeBody(event: any) {
    const value = Number(event.target.value);
    this.limitChangeBody.emit(value);
  }

  onTitleChange(value: string | Event, index: number) {
    // Atualiza título de push e contabiliza caracteres, cortando pelo limite atual
    const inputValue = typeof value === 'string' ? value : (value.target as HTMLTextAreaElement).value;
    const limitedValue = inputValue.slice(0, this.limitTitle);

    this.push[index].title = limitedValue;
    this.charCountTitle = limitedValue.length;
  }

  onBodyChange(value: string | Event, index: number) {
    // Atualiza corpo de push e contabiliza caracteres, cortando pelo limite atual
    const inputValue = typeof value === 'string' ? value : (value.target as HTMLTextAreaElement).value;
    const limitedValue = inputValue.slice(0, this.limitBody);

    this.push[index].body = limitedValue;
    this.charCountBody = limitedValue.length;
  }

  onTitleLimitChange(value: number) {
    // Aplica novo limite ao título e força recorte dos valores atuais
    this.limitTitle = value;
    this.applyLimitsToPush();
  }

  onBodyLimitChange(value: number) {
    // Aplica novo limite ao corpo e força recorte dos valores atuais
    this.limitBody = value;
    this.applyLimitsToPush();
  }

  clearPush(index: number) {
    this.push[index] = {
      title: '',
      body: '' 
    };

    this.limitTitle = 30;
    this.limitBody = 94;
  }

  @ViewChild('resultCount') resultCount!: ElementRef;

  onTextChange(event: any) {
    this.charCount = event.target.value.length
  }

  getPreviewText(text: string): string {
    if (!text) return '';

    const maxLength = this.isExpanded ? this.limitTitle : this.limitTitle;
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  } 

  getPreviewBody(text: string): string {
    if (!text) return '';

    const maxLength = this.isExpanded ? this.limitBody : this.limitBody;

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
}

