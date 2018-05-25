import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Leader } from '../shared/Leader';

@Injectable()
export class LeaderService {

  constructor(private http: Http, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id)
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
      .map(res => this.processHTTPMsgService.extractData(res)[0])
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

}
