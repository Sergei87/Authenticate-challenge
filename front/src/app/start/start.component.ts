import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.styl']
})
export class StartComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public logIn() {
    this.router.navigate(['./login'])
  }
  public register() {
    this.router.navigate(['./register'])
  }

}
