import { Injectable } from '@angular/core';

import { Promotion } from '../shared/Promotion';
import { PROMOTIONS } from '../shared/Promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: number): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter(x => x.id === id)[0]);
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter(x => x.featured)[0]);
  }

}
