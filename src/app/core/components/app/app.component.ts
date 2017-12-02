import { SideNavItemModel, SideNavModel } from '../side-nav/side-nav.component.model';
import { Logout } from '../../redux/user/user.actions';
import { getIsAdminSelector, getTopNavModelSelector, getIsTeacherSelector } from '../../../reducers';
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

  private _studentMenuItems = [{
    name: 'Dashboard',
    routerLink: ['./dashboard']
  },
  {
    name: 'Block Enrolment',
    routerLink: ['./enrol/blocks']
  }];

  private _teacherMenuItems = [{
    name: 'Blocks',
    routerLink: ['./blocks']
  }];

  constructor(private _store: Store<State>) { }

  public ngOnInit(): void {
    this.topNavModel$ = this._store.select(getTopNavModelSelector);

    this.sideNavModel$ = Observable.combineLatest(
      this._store.select(getIsTeacherSelector),
    ).map(([isTeacher]) => ({
      items: [
        ...this._studentMenuItems,
        ...Array.from(isTeacher ? this._teacherMenuItems : [])
      ]
    }));
  }

  public logout(): void {
    this._store.dispatch(new Logout());
  }
}
