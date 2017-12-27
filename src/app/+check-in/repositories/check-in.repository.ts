import { UserDto, dtoToUser } from '../../shared/repositories/user.dto';
import { ActionResult } from '../../shared/state-models/action-result';
import { User } from '../../shared/state-models/teacher';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';
import { StudentDetails } from '../redux/new-student/new-student.state';

@Injectable()
export class CheckInRepository {

  constructor(private _http: AuthHttp) { }

  public checkInToClass(classId: number, studentId: number): Observable<boolean> {
    return this._http.post(`${environment.apiUrl}/api/classes/${classId}/attendance/${studentId}`, {})
      .mapTo(true);
  }

  public removeFromClass(classId: number, studentId: number): Observable<boolean> {
    return this._http.delete(`${environment.apiUrl}/api/classes/${classId}/attendance/${studentId}`)
      .mapTo(true);
  }

  public enrolInBlock(blockId: number, studentId: number): Observable<void> {
    const dto = { blockIds: [blockId], userId: studentId };

    return this._http.post(`${environment.apiUrl}/api/users/${studentId}/enrolment`, dto)
      .mapTo(null);
  }

  public createStudent(student: StudentDetails): Observable<User> {
    return this._http.post(`${environment.apiUrl}/api/users`, student)
      .map(response => response.json() as ActionResult<UserDto>)
      .map(result => result.actionResult)
      .map(dtoToUser);
  }
}
