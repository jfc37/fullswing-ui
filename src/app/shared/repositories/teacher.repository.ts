import { dtoToTeacher, TeacherDto } from './teacher.dto';
import { Teacher } from '../state-models/teacher';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class TeacherRepository {

  constructor(private _http: AuthHttp) { }

  public getAll(): Observable<Teacher[]> {
    return this._http.get(`${environment.apiUrl}/api/teachers`)
      .map(response => response.json() as TeacherDto[])
      .map(dtos => dtos.map(dtoToTeacher));
  }
}
