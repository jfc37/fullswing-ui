import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';

export class TableDataSource<T> extends DataSource<T> {
  private _data: T[] = [];

  constructor(
    private _paginator?: MatPaginator,
    private _sort?: MatSort,
    private _ordering?: { [name: string]: (a: T, b: T) => number }) {
    super();
  }

  public sourceChange(data: T[]) {
    this._data = data;
  }

  public connect(): Observable<T[]> {
    const displayDataChanges = [
      this._paginator ? this._paginator.page : Observable.empty(),
      this._sort ? this._sort.sortChange : Observable.empty(),
    ];

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .map(() => {
        const data = this._data.slice();
        const sortedData = this.getSortedData(data);
        return this.getPaginatedData(sortedData);
      });
  }

  public disconnect() {
    // nothing to do...
  }

  private getPaginatedData(data: T[]) {
    if (!this._paginator) {
      return data;
    }

    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }

  private getSortedData(data: T[]): T[] {
    if (!this._sort || !this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const orderingFunction = this._ordering[this._sort.active];
      const order = orderingFunction ? orderingFunction(a, b) : 0;
      return order * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
