import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { observable, Observable } from 'rxjs';
import * as fbase from 'firebase/auth';
import { ActivatedRoute } from '@angular/router';
import { isEmpty, switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { EMPTY, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;

  constructor(private afAuth : AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new fbase.GoogleAuthProvider());
  }

  logout(){
    localStorage.removeItem('returnUrl')
    this.afAuth.signOut();
    window.location.reload();
  }

  get appUser$() : Observable<AppUser | null>{
    if(localStorage.getItem('returnUrl')){
      return this.user$.pipe(switchMap(user => this.userService.get(user!.uid).valueChanges()))
    } else{
      return EMPTY;
    }
  }
}
