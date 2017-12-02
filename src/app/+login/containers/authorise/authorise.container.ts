import { State, getIsAuthenticationCompleteSelector } from '../../../reducers';
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
    private _store: Store<State>,
    private _router: Router) { }

  public ngOnInit() {
    this._store.select(getIsAuthenticationCompleteSelector)
      .filter(Boolean)
      .first()
      .subscribe(() => this._router.navigateByUrl('/dashboard'));
  }
}
