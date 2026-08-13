import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result-char',
  imports: [
    NgClass
],
  templateUrl: './result-char.component.html',
  styleUrl: './result-char.component.scss',
})
export class ResultCharComponent {
  @Input() limit = 0;
  @Input() value = '';

  get charCount(): number {
    return this.value?.length ?? 0;
  }  

  getStatus(count: number, limit: number): string {
    if (count >= limit) return 'danger';
    if (count >= limit * 0.8) return 'warning';
    return 'ok';
  }
}
