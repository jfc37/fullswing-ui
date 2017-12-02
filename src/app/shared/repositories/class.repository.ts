import { ClassDto, dtoToClass } from './class.dto';
import { Class } from '../state-models/class';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';
import { dtoToUser } from './user.dto';
import { User } from '../state-models/teacher';

@Injectable()
export class ClassRepository {

  constructor(private _http: AuthHttp) { }

  /**
   * Gets the upcoming schedule for the logged in user
   */
  public getUpcomingSchedule(): Observable<Class[]> {
    return this._http.get(`${environment.apiUrl}/api/users/current/schedules`)
      .map(response => response.json() as ClassDto[])
      .map(dtos => dtos.map(dtoToClass))
      .catch(response => response.status === 404
        ? Observable.of([])
        : Observable.throw(response)
      );
  }

  public getForBlock(blockId: number): Observable<Class[]> {
    return this._http.get(`${environment.apiUrl}/api/blocks/${blockId}/classes`)
      .map(response => response.json() as ClassDto[])
      .map(dtos => dtos.map(dtoToClass));
  }

  public getById(id: number): Observable<{ class: Class, students: User[] }> {
    return this._http.get(`${environment.apiUrl}/api/classes/${id}`)
      .map(response => response.json() as ClassDto)
      .map(dto => ({
        class: dtoToClass(dto),
        students: [
          ...dto.actualStudents,
          ...dto.registeredStudents
        ].map(dtoToUser)
      }));
  }
}
