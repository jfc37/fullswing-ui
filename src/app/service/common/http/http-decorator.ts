import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const ID_JWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2pmYy1kZXYuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDU2ZTY0MWJiNWQzY2E5YWUxODUzYTlkMiIsImF1ZCI6ImphTFZ0dzkwdFh0OHRDQ0JJSElVSkxJY1AycDJNTWRFIiwiZXhwIjoxNTA0MjkzMDM2LCJpYXQiOjE1MDQyNTcwMzZ9.elgTnRI6lneZK22iqdQnv_xNssoLP9-5NGcGcjoLqPY';

@Injectable()
export class HttpDecorator extends Http {
  constructor (backend: XHRBackend, options: RequestOptions) {
    options.headers.set('Authorization', `Bearer ${ID_JWT}`);
    super(backend, options);
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${ID_JWT}`);
    } else {
      url.headers.set('Authorization', `Bearer ${ID_JWT}`);
    }
    return super.request(url, options);
  }
}
