import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    flyInOut(),
    expand()
  ],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  errorMessage: string;

  constructor(private dishService: DishService, @Inject('BaseURL') private BaseURL: string) {
  }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes, errMsg => this.errorMessage = <any>errMsg);
  }

}
