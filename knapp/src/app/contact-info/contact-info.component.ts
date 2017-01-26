import { Component, OnInit } from '@angular/core';
import { ContactService } from './../contact.service';
import { Routes, RouterModule, Router }   from '@angular/router';
import {Contact} from './../contact-list/contact-list.component';
import {ComposeMessageComponent} from './../compose-message/compose-message.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/contactInfo', pathMatch: 'full' },
  { path: 'contactInfo', component: ContactInfoComponent },
  { path: 'composeMessage', component: ComposeMessageComponent }
];

@Component({
  selector   : 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls  : ['./contact-info.component.css'],
  // providers: [ContactService]
})

export class ContactInfoComponent implements OnInit {

  contact       : Contact
  contactService: any

  constructor(contactService: ContactService, private router: Router ) {
    this.contactService = contactService
    this.contact        = this.contactService.getSelectedContact()
  }

  ngOnInit() {

  }

  onSendMsg(contact: Contact) {
    this.router.navigate(['composeMessage']);
  }

}