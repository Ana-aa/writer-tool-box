import { Component, ElementRef, Input, Output, ViewChild, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from "../atomic-design/organismos/text-input/text-input.component";
import { ButtonClearComponent } from "../atomic-design/atomos/button-clear/button-clear.component";
import { ConfigurationCountComponent } from "../configuration/configuration-count.component";

@Component({
  selector: 'app-whatsapp-preview',
  imports: [
    DevicePreview,
    FormsModule,
    TextInputComponent,
    ButtonClearComponent,
    ConfigurationCountComponent
],
  templateUrl: './whatsapp-preview.component.html',
  styleUrl: './whatsapp-preview.component.scss',
})
export class WhatsappPreviewComponent {
  @Input() limitMessage = 350;
  @Input() limitButton = 20;
  @Input() limitButtonTwo = 20; 

  charCount = 0;
  charCountMessage = 0;
  charCountButton = 0;
  charCountButtonTwo = 0;

  @Output() limitChangeMessage = new EventEmitter<number>();
  @Output() limitChangeButton = new EventEmitter<number>();
  @Output() limitChangeButtonTwo = new EventEmitter<number>();

  public readonly whatsappWarning = 'O WhatsApp pode exibir "Ler mais" em mensagens longas.<br> Este preview utiliza 350 caracteres como referência.' // Mensagem de aviso ao exceder o limite de caracteres da mensagem (350)

  @ViewChild('charPreview') charPreview!: ElementRef;

  currentMessage = '';
  currentButton = '';
  currentButtonTwo = '';

  whatsapp = [
    {
      message: '',
      button: '',
      buttonTwo: ''
    }
  ]
  
  private syncCountsFromWpp(): void { // Sincroniza a contagem de caracteres da mensagem e dos botões do WhatsApp com os valores atuais
    const firstWpp = this.whatsapp[0] ?? { message: '', button: '', buttonTwo: '' };
    this.charCountMessage = firstWpp.message.length;
    this.charCountButton = firstWpp.button.length;
    this.charCountButtonTwo = firstWpp.buttonTwo.length;
  }

  private applyLimitsToWpp(): void { // Aplica os limites de caracteres definidos pelo usuário à mensagem e aos botões do WhatsApp
    this.whatsapp = this.whatsapp.map((whatsapp) => ({
      message: whatsapp.message.slice(0, this.limitMessage),
      button: whatsapp.button.slice(0, this.limitButton),
      buttonTwo: whatsapp.buttonTwo.slice(0, this.limitButtonTwo)
    }));

    this.syncCountsFromWpp();
  }

  onNewLimitChangeMessage(event: any) { //Ajusta o limite de caracateres inserido pelo usuário
    const value = Number(event.target.value);
    this.limitChangeMessage.emit(value);
  }

  onNewLimitChangeButton(event: any) { //Ajusta o limite de caracateres inserido pelo usuário
    const value = Number(event.target.value);
    this.limitChangeButton.emit(value);
  }

  onNewLimitChangeButtonTwo(event: any) { // Ajusta o limite de caracateres inserido pelo usuário
    const value = Number(event.target.value);
    this.limitChangeButtonTwo.emit(value);
  }

  onMessageChange(event: any, index: number) { // Altera a mensagem do WhatsApp e atualiza a contagem de caracteres
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitMessage);
    textarea.value = limitedValue;

    this.whatsapp[index].message = limitedValue;
    this.charCountMessage = limitedValue.length;
  }

  onButtonChange(event: any, index: number) { // Altera a mensagem do WhatsApp e atualiza a contagem de caracteres
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitButton);
    textarea.value = limitedValue;

    this.whatsapp[index].button = limitedValue;
    this.charCountButton = limitedValue.length;
  }

  onButtonTwoChange(event: any, index: number) { // Altera a mensagem do WhatsApp e atualiza a contagem de caracteres
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitButtonTwo);
    textarea.value = limitedValue;

    this.whatsapp[index].buttonTwo = limitedValue;
    this.charCountButtonTwo = limitedValue.length;
  }

  onMessageLimitChange(newLimit: number) { // Lê o valor do limite de caracteres inserido pelo usuário e aplica o limite à mensagem 
    this.limitMessage = newLimit;
    this.applyLimitsToWpp();
  }

  onButtonLimitChange(newLimit: number) { // Lê o valor do limite de caracteres inserido pelo usuário e aplica o limite ao botão 1
    this.limitButton = newLimit;
    this.applyLimitsToWpp();
  }

  onButtonTwoLimitChange(newLimit: number) { // Lê o valor do limite de caracteres inserido pelo usuário e aplica o limite ao botão 2
    this.limitButtonTwo = newLimit;
    this.applyLimitsToWpp();
  }

  clearWpp() { // Limpa a mensagem e os botões do WhatsApp, reiniciando a contagem de caracteres
    this.whatsapp = [
      {
        message: '',
        button: '',
        buttonTwo: ''
      }
    ];

    this.currentMessage = '';
    this.charCountMessage = 0;
    this.limitMessage = 350;

    this.currentButton = '';
    this.charCountButton = 0;
    this.limitButton = 25;

    this.currentButtonTwo = '';
    this.charCountButtonTwo = 0;
    this.limitButtonTwo = 25;
  }

  @ViewChild('resultCount') resultCount!: ElementRef;

  onTextChange(event: any) { // Atualiza a contagem de caracteres da mensagem do WhatsApp
    this.charCount = event.target.value.length;
  }

  getPreviewText(text: string, maxLength = 350): string { // Retorna o texto da mensagem do WhatsApp, truncando-o se exceder o limite de caracteres
    if (!text) return '';

    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }

    return text;
  }

  shouldShowReadMore(text: string, maxLength = 350): boolean { // Determina se o texto da mensagem do WhatsApp deve ser truncado com 'Ler mais'
    return !!text && text.length > maxLength;
  }

  shouldShowWarningMessage(index: number): boolean { // Determina se a mensagem do WhatsApp excede o limite de caracteres (para exibir um aviso)
    return this.whatsapp[index].message.length >= 350;
  }
}
