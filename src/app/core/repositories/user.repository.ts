import { dtoToUser, UserDto } from '../../shared/repositories/user.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/state-models/teacher';

@Injectable()
export class UserRepository {

  constructor(private _http: AuthHttp) { }

  public getClaims(): Observable<string[]> {
    return this._http.get(`${environment.apiUrl}/api/users/current/claims`)
      .map(response => response.json() as string[]);
  }

  public search(text: string): Observable<User[]> {
    return this._http.get(`${environment.apiUrl}/api//users?q=fullname_cont_${text},orderby_fullname`)
      .map(response => response.json() as UserDto[])
      .map(dtos => dtos.map(dtoToUser));
  }
}
