import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/Dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes():Dish[] {
    return DISHES;
  }

  getDish(id: number): Dish {
    return DISHES.filter(x => x.id === id)[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter(x => x.featured)[0];
  }

}
