import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DevicePreview } from '../device-preview/device-frame.component';
import { ConfigurationCountComponent } from "../configuration/configuration-count.component";

@Component({
  selector: 'app-email-preview',
  imports: [
    DevicePreview,
    ConfigurationCountComponent,
    FormsModule
],
  templateUrl: './email-preview.component.html',
  styleUrl: './email-preview.component.scss',
})
export class EmailPreview {
  @Input() characterLimit = 33;
  charCount = 0;

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
    const value = (event.target as HTMLTextAreaElement).value;
    this.emails[index].nameEnterprise = value;
  }

  onHeaderChange(event: Event, index: number) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.emails[index].headerText = value;
  }

  onPreHeaderChange(event: Event, index: number) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.emails[index].preHeaderText = value;
  }

  addNewPeview() {
    this.emails.push({
      nameEnterprise: this.currentName,
      headerText: this.currentHeader,
      preHeaderText: this.currentPreHeader
    });

    this.currentName = '';
    this.currentHeader = '';
    this.currentPreHeader = '';
  }

  clearPeview() {
    this.currentCleanText = '';
  }

  updatePreview() {
    this.currentName = this.emails[0].nameEnterprise;
    this.currentHeader = this.emails[0].headerText;
    this.currentPreHeader = this.emails[0].preHeaderText;
  }

  getBarStatus(): string {
    if (this.charCount >= this.characterLimit) {
      return 'danger';
    } else if (this.charCount >= this.characterLimit * 0.8) {
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

  clearPreview() {
    this.emails = [
      {
        nameEnterprise: '',
        headerText: '',
        preHeaderText: ''
      }
    ]
  }
}
 