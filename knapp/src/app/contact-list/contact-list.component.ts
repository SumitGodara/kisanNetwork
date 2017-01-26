import { Component, OnInit } from '@angular/core';
import { ContactService } from './../contact.service';
import { Routes, RouterModule, Router }   from '@angular/router';
import { ContactInfoComponent } from './../contact-info/contact-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/contactList', pathMatch: 'full' },

  { path: 'contactList', component: ContactListComponent },
  { path: 'contactInfo', component: ContactInfoComponent }
];

export class Contact {
  fName   : string;
  lName   : string;
  number  : string;
  details : string;
}

@Component({
  selector   : 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls  : ['./contact-list.component.css'],
  // providers: [ContactService]
})

export class ContactListComponent implements OnInit {
  
  contacts       : Contact[]
  selectedContact: Contact;
  contactService : any

  constructor(contactService: ContactService, private router: Router ) {
    this.contactService = contactService;
    this.contacts       = this.contactService.getContacts();
  }
  
  ngOnInit() {
    this.selectedContact = this.contacts[0];
  }

  onSelect(contact: Contact): void {
    const _ = this
    
    _.selectedContact = contact;
    _.contactService.setSelectedContact(contact);
    _.router.navigate(['contactInfo']);
  }
}