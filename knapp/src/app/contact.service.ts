import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Contact } from './contact-list/contact-list.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import {ContactInfoComponent} from './contact-info/contact-info.component';
import {contacts} from './contact-list';
// import { SMSSent } from './sms/sms.component';

@Injectable()
export class ContactService {

  private selectedContact: Contact
  private contacts       : Contact[]
  private smsSentList
  private lastSent
  private lastUpd

  constructor(private http: Http) {
  }

  getContacts(): Contact[] {
    return contacts;
  }

  getSelectedContact(): Contact {
    return this.selectedContact;
  }

  setSelectedContact(contact: Contact): void {
    this.selectedContact = contact;
  }

  sendOtp(contact, msg) {

    const _    = this
    let param  = {
      contact: contact,
      msg    : msg
    }
    _.lastSent = new Date()
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post('/sendOtp', JSON.stringify({"param": param}), options)
                    .toPromise()
                    .then(_.extractData)
                    // .catch(_.catchError)
  }

  private extractData(res) {
    let body = res.json();

    if (body.error) return {error: body.error}
    else if (body.mongoError) return {error: body.mongoError}
    else if (body.twilioError) return {error: body.twilioError}
    return body.data || { };
  }

  setSMSList(smss) {
    this.smsSentList = smss
  }

  getSMSList() {
    const _ = this

    if (_.smsSentList && ((!_.lastSent && _.lastUpd) || _.lastUpd > _.lastSent)) {
      return Promise.resolve(_.smsSentList)
    } else {
      _.lastUpd   = new Date()
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      
      return this.http.post('/getSMS', options)
                      .toPromise()
                      .then(_.extractSmsList);
    }
  }

  private catchError(err) {
    return err
  }

  private extractSmsList(res) {
    let body = JSON.parse(res._body)
    if (body.mongoError) return body.mongoError
    return body.data
  }
}
