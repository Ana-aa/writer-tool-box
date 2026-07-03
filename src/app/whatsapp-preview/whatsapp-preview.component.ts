import { Component } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';

@Component({
  selector: 'app-whatsapp-preview',
  imports: [DevicePreview],
  templateUrl: './whatsapp-preview.component.html',
  styleUrl: './whatsapp-preview.component.scss',
})
export class WhatsappPreviewComponent {}
