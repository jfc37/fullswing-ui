import { AuthService } from './services/common/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  profile: any;

  constructor(
    public auth: AuthService
  ) {}

  public ngOnInit() {
    this.auth.handleAuthentication();

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }
}
