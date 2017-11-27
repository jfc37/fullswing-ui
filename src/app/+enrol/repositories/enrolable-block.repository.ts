import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';
import { EnrolableBlockDto, dtoToEnrolableBlock } from './enrolable-block.dto';
import { EnrolableBlock } from '../redux/enrolable-blocks/enrolable-blocks.state';

@Injectable()
export class EnrolableBlockRepository {

  constructor(private _http: AuthHttp) { }

  public getAll(): Observable<EnrolableBlock[]> {
    return this._http.get(`${environment.apiUrl}/api/blocks/for-enrolment`)
      .map(response => response.json() as EnrolableBlockDto[])
      .map(dtos => dtos.map(dtoToEnrolableBlock));
  }
}
