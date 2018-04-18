import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders():Leader[] {
    return LEADERS;
  }

  getLeader(id: number): Leader {
    return LEADERS.filter(x => x.id === id)[0];
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter(x => x.featured)[0];
  }

}
