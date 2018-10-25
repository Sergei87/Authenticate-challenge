import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  public logoutUser() {
    console.log('*******')
    this.auth.logOut().subscribe(data => console.log(data))
  }

  public getSubordinates() {
    this.auth.getSubordinates().subscribe(data => console.log(data))
  }

}
