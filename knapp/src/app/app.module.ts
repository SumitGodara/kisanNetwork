import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { SmsComponent } from './sms/sms.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactService } from './contact.service';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

const routes: Routes = [
  { path: '', redirectTo: '/appComponent', pathMatch: 'full' },
  { path: 'appComponent', component: AppComponent },
  { path: 'contactList', component: ContactListComponent },
  { path: 'contactInfo', component: ContactInfoComponent },
  { path: 'composeMessage', component: ComposeMessageComponent },
  { path: 'smsList', component: SmsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SmsComponent,
    ContactListComponent,
    ContactInfoComponent,
    ComposeMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
