import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  constructor(private router: Router) {}

  goToCountCaracter() {
    this.router.navigate(['/count-caracter']);
  }

  goToPushPreview() {
    this.router.navigate(['/push-preview']);
  }

  goToEmailPreview() {
    this.router.navigate(['/email-preview'])
  }

  goToWppPreview() {
    this.router.navigate(['/whatsapp-preview'])
  }

  goToConfigationCount() {
    this.router.navigate(['/configuration-count'])
  }
}
 