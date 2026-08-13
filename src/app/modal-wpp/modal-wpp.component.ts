import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-wpp',
  imports: [],
  templateUrl: './modal-wpp.component.html',
  styleUrl: './modal-wpp.component.scss',
})
export class ModalWppComponent {

  @ViewChild('modalElement') modalElement!: ElementRef;

  open(): void {
    const el: HTMLDialogElement = this.modalElement.nativeElement;
    if (typeof el.showModal === 'function') {
      el.showModal();
    } else {
      el.setAttribute('open', '');
    }
  }

  close(): void {
    const el: HTMLDialogElement = this.modalElement.nativeElement;
    if (typeof el.close === 'function') {
      el.close();
    } else {
      el.removeAttribute('open');
    }
  }
}
