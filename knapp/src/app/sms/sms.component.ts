import { Component, OnInit } from '@angular/core';
import { ContactService } from './../contact.service';
import { Routes, RouterModule, Router }   from '@angular/router';
import {Contact} from './../contact-list/contact-list.component';

// export class SMSSent {
//   OTP    : string
//   _id    : string
//   fName  : string
//   lName  : string
//   number : string
//   time   : string
// }

const routes: Routes = [
  { path: '', redirectTo: '/smsList', pathMatch: 'full' },

  { path: 'smsList', component: SmsComponent}
];
@Component({
  selector   : 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls  : ['./sms.component.css']
})

export class SmsComponent implements OnInit {

  smss         
  contactService: any
  noSms: boolean = false

  constructor(contactService: ContactService, private router: Router) { 
    this.contactService = contactService
    this.getSMS()
  }

  setSMSList(smss) {
    return this.contactService.setSMSList(smss)
  }

  getSMS() {

    const _ = this

      return new Promise(function(resolve, reject) {
        resolve(_.contactService.getSMSList())
      }).then((data) => {
        if (JSON.stringify(data).length === 2) _.noSms = true
        else _.noSms = false
        return _.smss = data;
      }).then(() => {
        this.setSMSList(this.smss)
      })
  }

  ngOnInit() {
  }

}