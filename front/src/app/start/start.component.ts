import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.styl']
})
export class StartComponent {

  constructor(private auth: AuthService, private router: Router) { }
}
