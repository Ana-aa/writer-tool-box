import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelInputComponent } from "../../moleculas/label-input/label-input.component";
import { ResultCharComponent } from "../../atomos/result-char/result-char.component";

@Component({
  selector: 'app-text-input',
  imports: [
    LabelInputComponent, 
    ResultCharComponent
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() maxlength: number | null = null;
  @Input() value = '';
  @Input() limit = 0;

  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
