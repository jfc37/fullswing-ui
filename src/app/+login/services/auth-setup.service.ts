import { Observable } from 'rxjs';

export class AuthSetup {
  constructor(private _lock2: { show: () => void }) { }

  public showLogin(): void {
    this._lock2.show();
  }
}
