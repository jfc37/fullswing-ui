import { dtoToPassTemplateSummary, PassTemplateDto } from './pass-template.dto';
import { PassTemplateSummary } from '../state-models/pass-template';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class PassTemplateRepository {

  constructor(private _http: AuthHttp) { }

  public getAllSummaries(): Observable<PassTemplateSummary[]> {
    return this._http.get(`${environment.apiUrl}/api/pass-templates`)
      .map(response => response.json() as PassTemplateDto[])
      .map(dtos => dtos.map(dtoToPassTemplateSummary));
  }
}
