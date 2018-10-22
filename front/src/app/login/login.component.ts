import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) { }

  public loginUser(e) {
    e.preventDefault()
    console.log(event)
    this.auth.logIn()
      .subscribe(user => {
        console.log('user on login', user)
        if (user) this.router.navigate(['./dashboard'])
      })
  }
  public onCancel() {
    this.router.navigate(['./start'])
  }

}
