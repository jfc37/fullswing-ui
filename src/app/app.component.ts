import { AuthService } from './services/common/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    public auth: AuthService
  ) {}

  public ngOnInit() {
    this.auth.handleAuthentication();
  }
}
