import { AuthoriseContainerDispatcher } from './authorise.container.dispatcher';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../core/redux/user/user.state';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-authorise',
  templateUrl: './authorise.container.html',
  styleUrls: ['./authorise.container.scss']
})
export class AuthoriseContainer implements OnInit {
  constructor(
    private _dispatcher: AuthoriseContainerDispatcher,
    private _router: Router) { }

  public ngOnInit() {
    this._dispatcher.completeAuthorisation()
      .first()
      .subscribe(() => this._router.navigateByUrl('/dashboard'));
  }
}
