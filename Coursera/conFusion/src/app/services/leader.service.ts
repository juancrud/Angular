import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return Observable.of(LEADERS).delay(2000).toPromise();
  }

  getLeader(id: number): Promise<Leader> {
    return Observable.of(LEADERS.filter(x => x.id === id)[0]).delay(2000).toPromise();
  }

  getFeaturedLeader(): Promise<Leader> {
    return Observable.of(LEADERS.filter(x => x.featured)[0]).delay(2000).toPromise();
  }

}
