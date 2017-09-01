import { AuthService } from './services/common/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  profile: any;

  constructor(
    public auth: AuthService,
    public http: AuthHttp
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

    this.http.get('https://api-speedydonkey.azurewebsites.net/api/blocks')
    .map(response => response.json())
    .subscribe();
  }
}
