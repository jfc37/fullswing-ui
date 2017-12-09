import { dtoToPass, PassDto, validateDtoPass } from './pass.dto';
import { Pass } from '../state-models/pass';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class PassRepository {

  constructor(private _http: AuthHttp) { }

  /**
   * Gets all current passes for the logged in user
   */
  public getAllCurrent(): Observable<Pass[]> {
    return this._http.get(`${environment.apiUrl}/api/users/current/passes`)
      .map(response => response.json() as PassDto[])
      .do(dtos => dtos.forEach(validateDtoPass))
      .map(dtos => dtos.map(dtoToPass));
  }

  public getForStudent(studentId: number): Observable<Pass[]> {
    return this._http.get(`${environment.apiUrl}/api/users/${studentId}/passes`)
      .map(response => response.json() as PassDto[])
      .do(dtos => dtos.forEach(validateDtoPass))
      .map(dtos => dtos.map(dtoToPass));
  }

  public purchaseForStudent(studentId: number, passTemplateId: number): Observable<Pass[]> {
    return this._http.post(`${environment.apiUrl}/api/users/${studentId}/pass-templates/${passTemplateId}`, { paymentStatus: 'paid' })
      .map(response => response.json().actionResult.passes as PassDto[])
      .do(dtos => dtos.forEach(validateDtoPass))
      .map(dtos => dtos.map(dtoToPass));
  }
}
