import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    _user = new BehaviorSubject<any>(null);

    get user() {
        return this._user.asObservable();
    }

    login(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('logged in', firebase.auth().currentUser);
                firebase.auth().currentUser.getIdTokenResult(false)
                    .then(token => console.log('checking token: ', token.claims))
                    .catch(err => console.error('error in getting token', err));
                // token.claims.admin to see if admin
                this._user.next(firebase.auth().currentUser);
            })
            .catch(err => console.error('login in failed => ', err));
    }

    signup(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                console.log('user created!', user);
                this._user.next(user);
            }).catch(err => console.error('error creating user => ', err));
    }

    logout() {
        firebase.auth().signOut()
            .then(() => console.log('logged out'))
            .catch(err => console.error('logout error => ', err));
    }

    addAdmin(email) {
        const adminFunc = firebase.functions().httpsCallable('addAdmin');
        adminFunc(email)
            .then(message => {
                console.log(message);
                this._user.next(firebase.auth().currentUser);
            })
            .catch(err => console.error('make admin failed => ', err));
    }
}
