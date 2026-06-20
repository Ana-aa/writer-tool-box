import { Component,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-count-caracter',
  imports: [],
  templateUrl: './count-caracter.component.html',
  styleUrl: './count-caracter.component.scss',
})
export class CountCaracterComponent {
  @ViewChild('charBar') charBar!: ElementRef;
  @ViewChild('resultCount') resultCount!: ElementRef;
  
}
