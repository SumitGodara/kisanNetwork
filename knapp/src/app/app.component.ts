import { Component, OnInit } from '@angular/core'
import { ContactListComponent } from './contact-list/contact-list.component'
import { Routes, RouterModule, Router }   from '@angular/router'
import { ContactService } from './contact.service'
import { SmsComponent } from './sms/sms.component'

const routes: Routes = [
  { path: '', redirectTo: '/appComponent', pathMatch: 'full' },

  { path: 'appComponent', component: AppComponent },
  { path: 'contactList', component: ContactListComponent },
  { path: 'smsList', component: SmsComponent }
];


@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css'],
  // providers: [ContactService]
})

export class AppComponent implements OnInit{
  title         : string = "Kisan Network Contact App"
  contactService: any
  active        : String

  constructor(contactService: ContactService, private router: Router ) {
    this.contactService = contactService
    this.active         = 'contactList'
    this.router.navigate(['contactList'])
  }

  ngOnInit() {
    this.active = 'contactList'
    this.router.navigate(['contactList'])
  }

  onSelect(id: String) {
    let path    = '' + id
    this.active = path
    this.router.navigate([path]);
  }

}
