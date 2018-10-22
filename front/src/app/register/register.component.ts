import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public registrateUser(e) {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value
    console.log(username, password)

    this.auth.registrate(username, password)
      .subscribe(user => {
        console.log('user on login', user)
        if (user) this.router.navigate(['./dashboard'])
      })
  }
  public onCancel() {
    this.router.navigate(['./start'])
  }


}
