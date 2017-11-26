import { dtoToUser, UserDto } from './user.dto';
import { User } from '../state-models/teacher';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class TeacherRepository {

  constructor(private _http: AuthHttp) { }

  public getAll(): Observable<User[]> {
    return this._http.get(`${environment.apiUrl}/api/teachers`)
      .map(response => response.json() as UserDto[])
      .map(dtos => dtos.map(dtoToUser));
  }
}
