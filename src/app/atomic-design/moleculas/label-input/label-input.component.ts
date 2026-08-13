import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextareaComponent } from '../../atomos/textarea/textarea.component';

@Component({
  selector: 'app-label-input',
  standalone: true,
  imports: [TextareaComponent],
  templateUrl: './label-input.component.html',
  styleUrl: './label-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelInputComponent),
      multi: true,
    },
  ],
})
export class LabelInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() maxlength: number | null = null;
  @Input() value = '';
  @Input() inputId = 'input-text';

  @Output() valueChange = new EventEmitter<string>();

  private onChange = (_: string) => {};
  private onTouched = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
    this.onChange(value);
    this.onTouched();
  }
}
