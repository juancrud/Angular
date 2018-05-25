import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProcessHTTPMsgService {

  constructor() { }

  public extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {
    let errorMsg: string;
    
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errorMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errorMsg);
  }
}
