import { BlockDto, blockToDto, dtoToBlock } from './block.dto';
import { Block } from '../state-models/block';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class BlockRepository {

  constructor(private _http: AuthHttp) { }

  public getAll(): Observable<Block[]> {
    return this._http.get(`${environment.apiUrl}/api/blocks`)
      .map(response => response.json() as BlockDto[])
      .map(dtos => dtos.map(dtoToBlock));
  }

  public getById(id: number): Observable<Block> {
    return this._http.get(`${environment.apiUrl}/api/blocks/${id}`)
      .map(response => response.json() as BlockDto)
      .map(dtoToBlock);
  }

  public update(block: Block): Observable<void> {
    const blockDto = blockToDto(block);
    return this._http.put(`${environment.apiUrl}/api/blocks/${blockDto.id}`, blockDto)
      .map(() => null);
  }

  public create(block: Block): Observable<void> {
    const blockDto = blockToDto(block);
    return this._http.post(`${environment.apiUrl}/api/blocks`, blockDto)
      .map(() => null);
  }
}
