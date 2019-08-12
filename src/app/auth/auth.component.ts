import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { AuthService } from './auth.service';
import { RouterExtensions } from 'nativescript-angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    moduleId: module.id,
})
export class AuthComponent implements OnInit {
    isLogin: boolean = true;
    form: FormGroup;
    isLoading: boolean;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    user: any;
    userSub: Subscription;
    @ViewChild('passwordEl', { static: true }) passwordEl: ElementRef<TextField>;

    constructor(private auth: AuthService, private router: RouterExtensions) { }

    ngOnInit() {
        console.log(`is this loading`);
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(6)]
            }),
            adminEmail: new FormControl(null, {
                updateOn: 'blur'
            })
        });
        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        });
        this.form.get('password').statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === 'VALID';
        });
        this.userSub = this.auth.user.subscribe(user => {
            if (user) {
                alert('Login/Signup Successful');
            }
        });
    }

    onSubmit() {
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        console.log(email, password);
        this.form.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
        if (this.isLogin) {
            this.auth.login(email, password);
            // this.router.navigate(['/home'], { clearHistory: true });
        } else {
            this.auth.signup(email, password);
            // this.router.navigate(['../default'], { clearHistory: true });
        }
    }

    onDone() {
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    switch() {
        this.isLogin = !this.isLogin;
    }

    onMakeAdmin() {
        const email = this.form.get('adminEmail').value;
        console.log('about to make admin ', email);
        this.auth.addAdmin(email);
    }

}
