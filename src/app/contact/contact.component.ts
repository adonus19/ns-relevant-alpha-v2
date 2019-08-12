import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
registerElement('CardView', () => CardView);
import * as firebase from "nativescript-plugin-firebase/app";

@Component({
    selector: 'ns-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    moduleId: module.id,
})
export class ContactComponent implements OnInit {
    emailAvailable = false;
    form: FormGroup;
    isSending: boolean;
    @ViewChild('prayerEl', { static: true }) prayerEl: ElementRef<TextField>;

    constructor() { }

    ngOnInit() {
        this.form = new FormGroup({
            request: new FormControl(null)
        });
    }

    sendEmail() {
        this.isSending = true;
        this.prayerEl.nativeElement.dismissSoftInput();
        console.log(`email button pressed! About to send email`)
        console.log(this.form.get('request').value);
        const cloudFunction = firebase.functions().httpsCallable('sendMail');
        cloudFunction(this.form.get('request').value)
            .then(res => {
                this.isSending = false;
                this.form.reset();
                console.log('here is what came back: ', res);
                /* --- Log of what to expect on return --- */
                // const sample = {
                //     "messageId": "<503198cb-7115-e837-f21b-7fc9517c5693@gmail.com>",
                //     "envelopeTime": 49,
                //     "rejected": [],
                //     "messageSize": 304,
                //     "envelope": {
                //         "to": [
                //             "daniel.j.pogue@gmail.com"
                //         ],
                //         "from": "relevant.app.mule@gmail.com"
                //     },
                //     "messageTime": 533,
                //     "response": "250 2.0.0 OK  1565570231 a7sm81398080iok.19 - gsmtp",
                //     "accepted": [
                //         "daniel.j.pogue@gmail.com"
                //     ]
                // }
            }).catch(err => {
                this.isSending = false;
                console.error('email error: ', err)
            });
    }


}
