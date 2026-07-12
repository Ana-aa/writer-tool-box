import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';
import { ConfigurationCountComponent } from "../configuration/configuration-count.component";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-email-preview',
  imports: [
    DevicePreview,
    ConfigurationCountComponent,
    NgClass
],
  templateUrl: './email-preview.component.html',
  styleUrl: './email-preview.component.scss',
})
export class EmailPreview {
  @Input() limitName = 30;
  @Input() limitHeader = 90;
  @Input() limitPreHeader = 100;
  charCount = 0;
  charCountName = 0;
  charCountHeader = 0;
  charCountPreHeader = 0;

  @Output() limitChangeName = new EventEmitter<number>();
  @Output() limitChangeHeader = new EventEmitter<number>();
  @Output() limitChangePreHeader = new EventEmitter<number>();

  private syncCountsFromEmails(): void {
    const firstEmail = this.emails[0] ?? { nameEnterprise: '', headerText: '', preHeaderText: '' };
    this.charCountName = firstEmail.nameEnterprise.length;
    this.charCountHeader = firstEmail.headerText.length;
    this.charCountPreHeader = firstEmail.preHeaderText.length;
  }

  private applyLimitsToEmails(): void {
    this.emails = this.emails.map((email) => ({
      nameEnterprise: email.nameEnterprise.slice(0, this.limitName),
      headerText: email.headerText.slice(0, this.limitHeader),
      preHeaderText: email.preHeaderText.slice(0, this.limitPreHeader),
    }));

    this.syncCountsFromEmails();
  }

  onInputChangeName(event: any) {
    const value = Number(event.target.value);
    this.limitChangeName.emit(value);
  }

  onInputChangeHeader(event: any) {
    const value = Number(event.target.value);
    this.limitChangeHeader.emit(value);
  }

  onInputChangePreHeader(event: any) {
    const value = Number(event.target.value);
    this.limitChangePreHeader.emit(value);
  }

  @ViewChild('charPreview') charPreview!: ElementRef;
  
  currentName = '';
  currentHeader = '';
  currentPreHeader = '';
  currentCleanText = '';
  
  emails = [
    {
      nameEnterprise: '',
      headerText: '',
      preHeaderText: ''
    }
  ];
  
  onNameChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitName);
    textarea.value = limitedValue;
    this.emails[index].nameEnterprise = limitedValue;
    this.charCountName = limitedValue.length;
  }

  onHeaderChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitHeader);
    textarea.value = limitedValue;
    this.emails[index].headerText = limitedValue;    
    this.currentPreHeader = limitedValue;    
    this.charCountHeader = limitedValue.length;
  }

  onPreHeaderChange(event: Event, index: number) {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitPreHeader);
    textarea.value = limitedValue;
    this.emails[index].preHeaderText = limitedValue;
    this.charCountPreHeader = limitedValue.length;
    this.currentPreHeader = limitedValue;
  }

  onNameLimitChange(value: number) {
    this.limitName = value;
    this.applyLimitsToEmails();
  }

  onHeaderLimitChange(value: number) {
    this.limitHeader = value;
    this.applyLimitsToEmails();
  }

  onPreHeaderLimitChange(value: number) {
    this.limitPreHeader = value;
    this.applyLimitsToEmails();
  }

  addNewPeview() {
    if (this.emails.length >= 2) {
      return;
    }

    this.emails.push({
      nameEnterprise: this.currentName,
      headerText: this.currentHeader,
      preHeaderText: this.currentPreHeader
    });

    this.charCountName = 0;
    this.charCountHeader = 0;
    this.charCountPreHeader = 0;

    this.currentName = '';
    this.currentHeader = '';
    this.currentPreHeader = '';
  }

  clearPeview() {
    this.emails = [{
      nameEnterprise: '',
      headerText: '',
      preHeaderText: ''
    }];

    this.currentName = '';
    this.currentHeader = '';
    this.currentPreHeader = '';

    this.charCountName = 0;
    this.charCountHeader = 0;
    this.charCountPreHeader = 0;
  }

  updatePreview() {
    this.currentName = this.emails[0].nameEnterprise;
    this.currentHeader = this.emails[0].headerText;
    this.currentPreHeader = this.emails[0].preHeaderText;
  }

  getStatusName(): string {
    if (this.charCountName >= this.limitName) {
      return 'danger';
    } else if (this.charCountName >= this.limitName * 0.8) {
      return 'warning';
    } else {
      return 'ok';
    }
  }

  getStatusHeader(): string {
    if (this.charCountHeader >= this.limitHeader) {
      return 'danger';
    } else if (this.charCountHeader >= this.limitHeader * 0.8) {
      return 'warning';
    } else {
      return 'ok';
    }
  }

  getStatusPreHeader(): string {
    if (this.charCountPreHeader >= this.limitPreHeader) {
      return 'danger';
    } else if (this.charCountPreHeader >= this.limitPreHeader * 0.8) {
      return 'warning';
    } else {
      return 'ok';
    }
  }

  @ViewChild('resultCount') resultCount!: ElementRef;

  onTextChange(event: any) {
    this.charCount = event.target.value.length;
    this.updatePreview();
  }

  truncateText(text: string, maxLength: number): string {
    if(!text) {
      return '';
    }

    return text.length > maxLength 
      ? text.slice(0, maxLength) + '...' 
      : text;
  }

  shouldShowPreviewTip(): boolean {
    return this.currentPreHeader.length >= 60;
  }

  complementText(): string {
    if(this.currentPreHeader.length >= 60) {
      return 'Preview baseado no Gmail para Android. <br>Geralmente são exibidos apenas 60 caracteres.';
    }
    return '';
  }
}