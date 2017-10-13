import { SideNavModel } from '../side-nav/side-nav.component.model';
import { Logout } from '../../redux/user/user.actions';
import { getTopNavModelSelector } from '../../../reducers';
import { TopNavModel } from '../top-nav/top-nav.component.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers/index';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public topNavModel$: Observable<TopNavModel>;
  public sideNavModel$: Observable<SideNavModel>;

  constructor(private _store: Store<State>) { }

  public ngOnInit(): void {
    this.topNavModel$ = this._store.select(getTopNavModelSelector);
    this.sideNavModel$ = Observable.of({
      items: [
        {
          name: 'Dashboard',
          routerLink: ['./dashboard']
        },
        {
          name: 'Blocks',
          routerLink: ['./blocks']
        },
      ]
    } as SideNavModel);
  }

  public logout(): void {
    this._store.dispatch(new Logout());
  }
}
