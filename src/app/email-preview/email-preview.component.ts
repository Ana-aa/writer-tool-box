import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { DevicePreview } from '../device-preview/device-frame.component';
import { ConfigurationCountComponent } from "../configuration/configuration-count.component";
import { FormsModule } from '@angular/forms';
import { ButtonClearComponent } from "../atomic-design/atomos/button-clear/button-clear.component";
import { TextInputComponent } from "../atomic-design/organismos/text-input/text-input.component";

@Component({
  selector: 'app-email-preview',
  imports: [
    DevicePreview,
    ConfigurationCountComponent,
    FormsModule,
    ButtonClearComponent,
    TextInputComponent
], 
  templateUrl: './email-preview.component.html',
  styleUrl: './email-preview.component.scss',
})
export class EmailPreview {
  @Input() limitName = 30;
  @Input() limitHeader = 90;
  @Input() limitPreHeader = 100;

  charCount = 0;
  charCountName = 0;
  charCountHeader = 0;
  charCountPreHeader = 0;

  @Output() limitChangeName = new EventEmitter<number>();
  @Output() limitChangeHeader = new EventEmitter<number>();
  @Output() limitChangePreHeader = new EventEmitter<number>();

  public readonly warningEmail = 'Preview baseado no Gmail para Android. <br>Geralmente são exibidos apenas 60 caracteres.'

  // Sincroniza a contagem de caracteres do nome da empresa, header e pré-header do e-mail com os valores atuais
  private syncCountsFromEmails(): void {
    const firstEmail = this.emails[0] ?? { nameEnterprise: '', headerText: '', preHeaderText: '' };
    this.charCountName = firstEmail.nameEnterprise.length;
    this.charCountHeader = firstEmail.headerText.length;
    this.charCountPreHeader = firstEmail.preHeaderText.length;
  }

  // Aplica os limites de caracteres definidos pelo usuário ao nome da empresa, header e pré-header do e-mail
  private applyLimitsToEmails(): void { 
    this.emails = this.emails.map((email) => ({
      nameEnterprise: email.nameEnterprise.slice(0, this.limitName),
      headerText: email.headerText.slice(0, this.limitHeader),
      preHeaderText: email.preHeaderText.slice(0, this.limitPreHeader),
    }));

    this.syncCountsFromEmails();
  }

  // Recebe mudança de limite via controle e emite novo valor para o nome
  onNewLimitChangeName(event: any) {
    const value = Number(event.target.value);
    this.limitChangeName.emit(value);
  }

  // Recebe mudança de limite via controle e emite novo valor para o header
  onNewLimitChangeHeader(event: any) {
    const value = Number(event.target.value);
    this.limitChangeHeader.emit(value);
  }

  // Recebe mudança de limite via controle e emite novo valor para o pré-header
  onNewLimitChangePreHeader(event: any) {
    const value = Number(event.target.value);
    this.limitChangePreHeader.emit(value);
  }

  @ViewChild('charPreview') charPreview!: ElementRef;
  
  currentName = '';
  currentHeader = '';
  currentPreHeader = '';
  currentCleanText = '';
  
  emails = [
    {
      nameEnterprise: '',
      headerText: '',
      preHeaderText: ''
    }
  ];
  
  onNameChange(event: any, index: number) {
    // Atualiza o campo 'Nome da empresa' e a contagem de caracteres, respeitando o limite atual
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitName);
    textarea.value = limitedValue;

    this.emails[index].nameEnterprise = limitedValue;
    this.charCountName = limitedValue.length;
  }

  onHeaderChange(event: any, index: number) {
    // Atualiza o header do e-mail e contabiliza caracteres, respeitando o limite configurado
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitHeader);
    textarea.value = limitedValue;

    this.emails[index].headerText = limitedValue;
    this.charCountHeader = limitedValue.length;
  }

  onPreHeaderChange(event: any, index: number) {
    // Atualiza o pré-header e ajusta a contagem de caracteres de acordo com o limite
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const limitedValue = value.slice(0, this.limitPreHeader);

    this.emails[index].preHeaderText = limitedValue;
    this.currentPreHeader = limitedValue;
  }

  onNameLimitChange(value: number) {
    // Atualiza o limite do nome e força recorte dos valores atuais
    this.limitName = value;
    this.applyLimitsToEmails();
  }

  onHeaderLimitChange(value: number) {
    // Atualiza o limite do header e força recorte dos valores atuais
    this.limitHeader = value;
    this.applyLimitsToEmails();
  }

  onPreHeaderLimitChange(value: number) {
    // Atualiza o limite do pré-header e força recorte dos valores atuais
    this.limitPreHeader = value;
    this.applyLimitsToEmails();
  }

  addNewPeview() { // Adiciona um novo preview de e-mail, limitando a quantidade máxima de previews a 2
    if (this.emails.length >= 2) {
      return;
    }

    this.emails.push({ 
      nameEnterprise: this.currentName,
      headerText: this.currentHeader,
      preHeaderText: this.currentPreHeader
    });

    this.charCountName = 0;
    this.charCountHeader = 0;
    this.charCountPreHeader = 0;

    this.currentName = '';
    this.currentHeader = '';
    this.currentPreHeader = '';
  }

  clearEmails() { // Limpa os campos de e-mail e reseta a contagem de caracteres
    this.emails = [{
      nameEnterprise: '',
      headerText: '',
      preHeaderText: ''
    }];

    this.currentName = '';
    this.charCountName = 0;
    this.limitName = 30;

    this.currentHeader = '';
    this.charCountHeader = 0;
    this.limitHeader = 90;

    this.currentPreHeader = '';
    this.charCountPreHeader = 0;
    this.limitPreHeader = 100;
  }

  @ViewChild('resultCount') resultCount!: ElementRef;

  onTextChange(event: any) { // Atualiza a contagem de caracteres do campo de texto e atualiza o preview
    this.charCount = event.target.value.length;
  }

  truncateText(text: string, maxLength: number): string { // Trunca o texto se exceder o limite de caracteres, adicionando reticências
    if(!text) {
      return '';
    }

    return text.length > maxLength 
      ? text.slice(0, maxLength) + '...' 
      : text;
  }

  shouldShowPreviewTip(index: number): boolean { // Determina se deve exibir a dica de preview com base no comprimento do pré-header
    return this.emails[index].preHeaderText.length >= 60;
  }
}
