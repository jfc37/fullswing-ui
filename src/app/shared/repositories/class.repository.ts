import { ClassDto, dtoToClass } from './class.dto';
import { Class } from '../state-models/class';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClassRepository {

  constructor(private _http: AuthHttp) { }

  /**
   * Gets the upcoming schedule for the logged in user
   */
  public getUpcomingSchedule(): Observable<Class[]> {
    return this._http.get(`${environment.apiUrl}/api/users/current/schedules`)
      .map(response => response.json() as ClassDto[])
      .map(dtos => dtos.map(dtoToClass));
  }
}
