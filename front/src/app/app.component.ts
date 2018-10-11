import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { Observable } from 'rxjs'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
  title = 'front';
  constructor(private auth: AuthService) {}

  public logIn() {
    this.auth.logIn('olya', 'hammer69').subscribe(data => console.log('*******',data))
  }

}
