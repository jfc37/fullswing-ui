import { AuthService } from '../../../services/common/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fs-login',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss']
})
export class LoginContainer implements OnInit {
  constructor(private _authService: AuthService) {}

  public ngOnInit() {
    this._authService.login();
  }
}
