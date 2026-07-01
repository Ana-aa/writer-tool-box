import { Routes } from '@angular/router';
import { CountCaracterComponent } from './count-caracter/count-caracter.component';
import { PushPreview } from './push-preview/push-preview.component';
import { EmailPreview } from './email-preview/email-preview.component';
import { WhatsappPreviewComponent } from './whatsapp-preview/whatsapp-preview.component';
import { ConfigurationCountComponent } from './configuration/configuration-count.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { 
        path: 'count-caracter', 
        component: CountCaracterComponent 
    },
    { 
        path: 'push-preview', 
        component: PushPreview
    },
    { 
        path: 'email-preview', 
        component: EmailPreview
    },
    { 
        path: 'whatsapp-preview', 
        component: WhatsappPreviewComponent 
    },
    {
        path: 'configuration', 
        component: ConfigurationCountComponent 
    }
]; 
