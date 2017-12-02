import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserRepository {

  constructor(private _http: AuthHttp) { }

  public getClaims(): Observable<string[]> {
    return this._http.get(`${environment.apiUrl}/api/users/current/claims`)
      .map(response => response.json() as string[]);
  }
}
