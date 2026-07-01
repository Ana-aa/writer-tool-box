import { Component } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';

@Component({
  selector: 'app-push-preview',
  imports: [
    DevicePreview
  ],
  templateUrl: './push-preview.component.html',
  styleUrl: './push-preview.component.scss',
})
export class PushPreview {}
