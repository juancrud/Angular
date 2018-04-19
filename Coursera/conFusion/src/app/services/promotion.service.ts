import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { Promotion } from '../shared/Promotion';
import { PROMOTIONS } from '../shared/Promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return Observable.of(PROMOTIONS).delay(2000).toPromise();
  }

  getPromotion(id: number): Promise<Promotion> {
    return Observable.of(PROMOTIONS.filter(x => x.id === id)[0]).delay(2000).toPromise();
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return Observable.of(PROMOTIONS.filter(x => x.featured)[0]).delay(2000).toPromise();
  }

}
