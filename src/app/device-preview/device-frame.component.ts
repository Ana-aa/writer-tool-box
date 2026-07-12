import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-device-preview',
  imports: [],
  templateUrl: './device-frame.component.html',
  styleUrl: './device-frame.component.scss',
})
export class DevicePreview {
  @Input() width: string = '470px';
}
