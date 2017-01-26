import { Component, OnInit } from '@angular/core';
import { ContactService } from './../contact.service';
import { Routes, RouterModule, Router }   from '@angular/router';
import {Contact} from './../contact-list/contact-list.component';
import { SmsComponent } from './../sms/sms.component'

const routes: Routes = [
  { path: '', redirectTo: '/composeMessage', pathMatch: 'full' },
  { path: 'composeMessage', component: ComposeMessageComponent },
  { path: 'smsList', component: SmsComponent }
];

@Component({
  selector   : 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls  : ['./compose-message.component.css']
})

export class ComposeMessageComponent implements OnInit {

  private contact       : Contact
  private contactService: any
  private composedMsg   : String
  private response      : any
  private errorMessage  : any
  private sendMsgStr    : string
  
  constructor(contactService: ContactService, private router: Router ) {
    this.contactService = contactService
    this.contact        = this.contactService.getSelectedContact();
    this.composedMsg    = "Hi. Your OTP is:" + (Math.floor(Math.random()*900000) + 100000);
  }

  ngOnInit() {
    
  }

  onSend(contact: Contact) {
    const _      = this
    _.sendMsgStr = "Sending SMS to " +  contact.number

    return new Promise(function(resolve, reject) {
      resolve(_.contactService.sendOtp(contact, _.composedMsg))
    }).then((data) => {
      _.response = data
      console.log(data)
      if (_.response.error) {
        _.sendMsgStr = "Error Sending SMS to " +  contact.number + " " + _.response.error
      } else {
        _.router.navigate(['smsList']);
      }
    }).catch(function(err) {
      return err
    })
  }

}
