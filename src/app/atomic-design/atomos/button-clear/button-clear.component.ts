import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-clear',
  imports: [],
  templateUrl: './button-clear.component.html',
  styleUrl: './button-clear.component.scss',
})
export class ButtonClearComponent {
  @Input() label = 'Limpar';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant = 'primary';
  @Input() disabled = false;

  @Output() action = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.action.emit();
    }
  }
}
