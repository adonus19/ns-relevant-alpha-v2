import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

    constructor() { }

    ngOnInit() {
        this.form = new FormGroup({
            request: new FormControl(null)
        });
    }

    sendEmail() {
        // console.log('about to init email');
        // email.available().then((avail: boolean) => {
        //     this.emailAvailable = avail;
        //     console.log('987349872349872348ajhasdf;ljhasdflkjhsad@#$', avail);
        //     if (this.emailAvailable) {
        //         email.compose({
        //             subject: 'Test',
        //             body: 'This email was sent from the app!',
        //             to: ['daniel.j.pogue@gmail.com']
        //         }).then(() => {
        //             console.log('hopefully the email was sent!');
        //         }).catch(err => console.error('Something went wrong with email!', err));
        //     }
        // });
        console.log(`email button pressed! About to send email`)
        console.log(this.form.get('request').value);
        const cloudFunction = firebase.functions().httpsCallable('sendMail');
        cloudFunction(this.form.get('request').value)
            .then(res => {
                console.log('here is what came back: ', res);
            }).catch(err => console.error('email error: ', err));
    }


}
