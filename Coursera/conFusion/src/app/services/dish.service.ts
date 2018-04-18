import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/Dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id: number): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter(x => x.id === id)[0]), 2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter(x => x.featured)[0]), 2000);
    });
  }

}
