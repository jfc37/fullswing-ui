import { Component, OnInit } from '@angular/core';
import { AuthSetup } from '../../services/auth-setup.service';

@Component({
  selector: 'fs-login',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss']
})
export class LoginContainer implements OnInit {
  constructor(private _lock: AuthSetup) {}

  public ngOnInit() {
    this._lock.showLogin();
  }
}
