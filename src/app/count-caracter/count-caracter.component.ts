import { Component,ViewChild, ElementRef, Input } from '@angular/core';
import { NgClass } from "@angular/common";
import { ConfigurationCountComponent } from "../configuration/configuration-count.component";
import { ButtonClearComponent } from "../atomic-design/atomos/button-clear/button-clear.component";

@Component({
  selector: 'app-count-caracter',
  imports: [
    NgClass,
    ConfigurationCountComponent,
    ButtonClearComponent
],
  templateUrl: './count-caracter.component.html',
  styleUrl: './count-caracter.component.scss',
})

export class CountCaracterComponent {
  @Input() characterLimit = 30;
  charCount = 0;

  @ViewChild('charBar') charBar!: ElementRef;
  @ViewChild('textArea') textArea!: ElementRef;

  onTextChange(event: any) {
    this.charCount = event.target.value.length;
    this.updateBar();
  }

  updateBar() {
    const percentage = (this.charCount / this.characterLimit) * 100;
    this.charBar.nativeElement.style.width = percentage + '%';
  }

  onLimitChange(newLimit: number) {
    this.characterLimit = newLimit;
    this.updateBar();
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

  clearCount() {
    this.charCount = 0;
    this.characterLimit = 30;
    // limpar valor do textarea no DOM
    if (this.textArea && this.textArea.nativeElement) {
      this.textArea.nativeElement.value = '';
    }
    this.updateBar();
  }
  
}
