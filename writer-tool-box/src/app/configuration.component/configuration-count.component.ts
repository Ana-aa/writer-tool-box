import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-configuration-count',
  imports: [],
  templateUrl: './configuration-count.component.html',
  styleUrl: './configuration-count.component.scss',
})
export class ConfigurationCountComponent {
  @Output() limitChange = new EventEmitter<number>();

  onInputChange(event: any) {
    const value = Number(event.target.value);
    this.limitChange.emit(value);
  }
}
