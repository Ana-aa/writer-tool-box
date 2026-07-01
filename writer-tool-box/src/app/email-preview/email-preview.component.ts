import { Component } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';
import { ConfigurationCountComponent } from "../configuration/configuration-count.component";

@Component({
  selector: 'app-email-preview',
  imports: [
    DevicePreview,
    ConfigurationCountComponent
],
  templateUrl: './email-preview.component.html',
  styleUrl: './email-preview.component.scss',
})
export class EmailPreview {
  
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

}
